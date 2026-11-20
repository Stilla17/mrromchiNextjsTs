import { expect, test, type Page } from "@playwright/test";

type User = {
  id: string;
  name: string;
  phone: string;
  initials: string;
  status: string;
};

test("footer foydalanuvchilar bo'limini faqat adminga ko'rsatadi", async ({ page }) => {
  let role: "admin" | "user" = "user";
  await page.route("https://telegram.org/js/telegram-web-app.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: 'window.Telegram = { WebApp: { initData: "signed-test-data", ready() {} } };',
    }),
  );
  await page.route("http://localhost:5100/api/session/me", async (route) => {
    const request = route.request();
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:3100",
      "Access-Control-Allow-Headers": "authorization,content-type",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    };
    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers });
      return;
    }
    expect(request.headers().authorization).toBe("tma signed-test-data");
    await route.fulfill({
      status: 200,
      headers,
      json: { data: { id: "1".repeat(24), role } },
    });
  });

  await page.goto("/home/");
  await expect(page.getByRole("link", { name: "Foydalanuvchilar" })).toHaveCount(0);
  role = "admin";
  await page.reload();
  await expect(page.getByRole("link", { name: "Foydalanuvchilar" })).toBeVisible();
});

async function mockUsers(page: Page, count = 1) {
  let users: User[] = Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(16).padStart(24, "0"),
    name: `Foydalanuvchi ${index + 1}`,
    phone: `+99890${String(index + 1).padStart(7, "0")}`,
    initials: "F",
    status: "active",
  }));

  await page.route("https://telegram.org/js/telegram-web-app.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: 'window.Telegram = { WebApp: { initData: "signed-test-data", ready() {} } };',
    }),
  );

  await page.route("http://localhost:5100/api/users**", async (route) => {
    const request = route.request();
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:3100",
      "Access-Control-Allow-Headers": "authorization,content-type",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    };
    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers });
      return;
    }
    expect(request.headers().authorization).toBe("tma signed-test-data");
    const url = new URL(request.url());
    const id = url.pathname.split("/")[3];
    const reply = (status: number, body?: unknown) =>
      route.fulfill({
        status,
        headers,
        ...(body === undefined ? {} : { json: body }),
      });

    if (request.method() === "GET" && !id) {
      const currentPage = Number(url.searchParams.get("page"));
      await reply(200, {
        data: users.slice((currentPage - 1) * 20, currentPage * 20),
        pagination: {
          page: currentPage,
          limit: 20,
          total: users.length,
          totalPages: Math.ceil(users.length / 20),
        },
      });
    } else if (request.method() === "POST") {
      const input = request.postDataJSON() as {
        fullName: string;
        phone: string;
      };
      if (users.some((user) => user.phone === input.phone)) {
        await reply(409, {
          message: "Telefon yoki Telegram hisobi allaqachon mavjud.",
        });
        return;
      }
      const user = {
        id: "a".repeat(24),
        name: input.fullName,
        phone: input.phone,
        initials: "AV",
        status: "active",
      };
      users.unshift(user);
      await reply(201, { data: user });
    } else {
      const user = users.find((item) => item.id === id);
      if (!user) {
        await reply(404, { message: "Foydalanuvchi topilmadi." });
        return;
      }
      if (request.method() === "PATCH") {
        const input = request.postDataJSON() as {
          fullName: string;
          phone: string;
        };
        Object.assign(user, { name: input.fullName, phone: input.phone });
      }
      if (request.method() === "DELETE") {
        users = users.filter((item) => item.id !== id);
        await reply(204);
      } else await reply(200, { data: user });
    }
  });
}

test("create, view, update and delete refresh the user list", async ({
  page,
}) => {
  await mockUsers(page);
  await page.goto("/users/");
  await expect(
    page.getByRole("heading", { name: "Foydalanuvchi 1", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Foydalanuvchi qo‘shish", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Ism va familiya").fill("Ali Valiyev");
  await dialog.getByLabel("Telefon raqami").fill("909999999");
  await dialog.getByRole("button", { name: "Qo'shish", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Ali Valiyev", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("2 ta", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Ali Valiyev: ko‘rish" }).click();
  await expect(dialog.getByText("Ali Valiyev", { exact: true })).toBeVisible();
  await expect(
    dialog.getByText("+998909999999", { exact: true }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Tahrirlash", exact: true }).click();
  await expect(dialog.getByLabel("Ism va familiya")).toHaveValue("Ali Valiyev");
  await expect(dialog.getByLabel("Telefon raqami")).toHaveValue("90 999 99 99");
  await dialog.getByLabel("Ism va familiya").fill("Ali Karimov");
  await dialog.getByRole("button", { name: "Saqlash", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Ali Karimov", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Ali Karimov: o‘chirish" }).click();
  await dialog.getByRole("button", { name: "O'chirish", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Ali Karimov", exact: true }),
  ).toHaveCount(0);
  await expect(page.getByText("1 ta", { exact: true })).toBeVisible();
});

test("phone prefix stays fixed, paste normalizes and incomplete numbers cannot submit", async ({
  page,
}) => {
  await mockUsers(page);
  await page.goto("/users/");
  await page
    .getByRole("button", { name: "Foydalanuvchi qo‘shish", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  const phone = dialog.getByLabel("Telefon raqami");
  await expect(dialog.getByText("+998", { exact: true })).toBeVisible();
  await dialog.getByLabel("Ism va familiya").fill("Ali Valiyev");
  await phone.fill("90");
  await dialog.getByRole("button", { name: "Qo'shish", exact: true }).click();
  await expect(dialog).toBeVisible();
  expect(
    await phone.evaluate((element: HTMLInputElement) =>
      element.checkValidity(),
    ),
  ).toBe(false);

  await phone.evaluate((element) => {
    const clipboardData = new DataTransfer();
    clipboardData.setData("text", "+998 (90) 123-45-67");
    element.dispatchEvent(
      new ClipboardEvent("paste", {
        bubbles: true,
        cancelable: true,
        clipboardData,
      }),
    );
  });
  await expect(phone).toHaveValue("90 123 45 67");
  await expect(dialog.locator('input[name="phone"]')).toHaveValue(
    "+998901234567",
  );
  await phone.fill("");
  await expect(dialog.getByText("+998", { exact: true })).toBeVisible();
  await expect(dialog.locator('input[name="phone"]')).toHaveValue("+998");
});

test("server errors preserve the form and closing clears the error", async ({
  page,
}) => {
  await mockUsers(page);
  await page.goto("/users/");
  await page
    .getByRole("button", { name: "Foydalanuvchi qo‘shish", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Ism va familiya").fill("Duplicate");
  await dialog.getByLabel("Telefon raqami").fill("900000001");
  await dialog.getByRole("button", { name: "Qo'shish", exact: true }).click();
  await expect(dialog.getByRole("alert")).toContainText("allaqachon mavjud");
  await expect(dialog.getByLabel("Ism va familiya")).toHaveValue("Duplicate");
  await dialog.getByRole("button", { name: "Bekor qilish" }).click();
  await page
    .getByRole("button", { name: "Foydalanuvchi qo‘shish", exact: true })
    .click();
  await expect(dialog.getByRole("alert")).toHaveCount(0);
  await expect(dialog.getByLabel("Ism va familiya")).toHaveValue("");
});

test("deleting the final user on page two returns to page one", async ({
  page,
}) => {
  await mockUsers(page, 21);
  await page.goto("/users/");
  await page.getByRole("button", { name: "Keyingi" }).click();
  await page
    .getByRole("button", { name: "Foydalanuvchi 21: o‘chirish" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "O'chirish", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Foydalanuvchi 1", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("20 ta", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Ro'yxat sahifalari" }),
  ).toHaveCount(0);
});

test("outside Telegram shows a login message without calling the API", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().startsWith("http://localhost:5100/"))
      requests.push(request.url());
  });
  await page.route("https://telegram.org/js/telegram-web-app.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "window.Telegram = { WebApp: { initData: '' } };",
    }),
  );
  await page.goto("/users/");
  await expect(page.getByRole("main").getByRole("alert")).toContainText(
    "Telegram bot orqali",
  );
  await expect(
    page.getByRole("button", { name: "Foydalanuvchi qo‘shish", exact: true }),
  ).toBeDisabled();
  expect(requests).toHaveLength(0);
});

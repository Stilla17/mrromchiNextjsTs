import { expect, test, type Page } from "@playwright/test";

type Category = {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
};

type Master = {
  id: string;
  categoryId: string;
  name: string;
  phone: string;
  description: string;
  rating: number;
  extraDetails: string[];
};

async function mockCategories(page: Page, initial: Category[] = []) {
  let categories = [...initial];
  const masters: Master[] = [];
  let sequence = initial.length;
  await page.route("https://telegram.org/js/telegram-web-app.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: 'window.Telegram = { WebApp: { initData: "category-test-data", ready() {} } };',
    }),
  );
  await page.route("http://localhost:5100/api/masters**", async (route) => {
    const request = route.request();
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:3100",
      "Access-Control-Allow-Headers": "authorization,content-type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    };
    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers });
      return;
    }
    expect(request.headers().authorization).toBe("tma category-test-data");
    if (request.method() === "GET") {
      const categoryId = new URL(request.url()).searchParams.get("categoryId");
      await route.fulfill({
        status: 200,
        headers,
        json: { data: masters.filter((master) => master.categoryId === categoryId) },
      });
      return;
    }
    const id = new URL(request.url()).pathname.split("/")[3];
    if (request.method() === "POST") {
      const input = request.postDataJSON() as Omit<Master, "id">;
      const master = { ...input, id: `master-${masters.length + 1}` };
      masters.push(master);
      await route.fulfill({ status: 201, headers, json: { data: master } });
      return;
    }
    const index = masters.findIndex((master) => master.id === id);
    if (request.method() === "PATCH") {
      const input = request.postDataJSON() as Omit<Master, "id" | "categoryId">;
      Object.assign(masters[index]!, input);
      await route.fulfill({ status: 200, headers, json: { data: masters[index] } });
      return;
    }
    masters.splice(index, 1);
    await route.fulfill({ status: 204, headers });
  });
  await page.route("http://localhost:5100/api/categories**", async (route) => {
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
    expect(request.headers().authorization).toBe("tma category-test-data");
    const id = new URL(request.url()).pathname.split("/")[3];
    const reply = (status: number, body?: unknown) =>
      route.fulfill({
        status,
        headers,
        ...(body === undefined ? {} : { json: body }),
      });
    if (request.method() === "GET") {
      await reply(200, { data: categories });
      return;
    }
    const input =
      request.method() === "DELETE"
        ? undefined
        : (request.postDataJSON() as {
            name: string;
            parentId?: string | null;
          });
    if (input) {
      const parentId = id
        ? categories.find((item) => item.id === id)?.parentId
        : input.parentId;
      if (
        categories.some(
          (item) =>
            item.id !== id &&
            item.parentId === parentId &&
            item.name.toLowerCase() === input.name.toLowerCase(),
        )
      ) {
        await reply(409, {
          message: "Bu bo'limda shu nomli kategoriya mavjud.",
        });
        return;
      }
    }
    if (request.method() === "POST" && input) {
      const parent = categories.find((item) => item.id === input.parentId);
      const category = {
        id: (++sequence).toString(16).padStart(24, "0"),
        name: input.name,
        parentId: input.parentId ?? null,
        level: parent ? parent.level + 1 : 1,
      };
      categories.push(category);
      await reply(201, { data: category });
    } else if (request.method() === "PATCH" && input) {
      const category = categories.find((item) => item.id === id)!;
      category.name = input.name;
      await reply(200, { data: category });
    } else {
      const removed = new Set([id]);
      for (let level = 1; level <= 3; level++) {
        categories.forEach((item) => {
          if (item.parentId && removed.has(item.parentId)) removed.add(item.id);
        });
      }
      categories = categories.filter((item) => !removed.has(item.id));
      await reply(204);
    }
  });
  return {
    clear: () => {
      categories = [];
    },
  };
}

test("custom category tree: three levels, confirmation, breadcrumbs, rename and cascade delete", async ({
  page,
}, testInfo) => {
  await mockCategories(page);
  await page.goto("/categories/");
  await expect(
    page.getByRole("heading", { name: "Birinchi kategoriyangizni yarating" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Kategoriya qo'shish", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Kategoriya nomi").fill("Derazalar");
  await dialog.getByRole("button", { name: "Qo'shish", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await page.getByRole("link", { name: "Derazalar: ochish" }).click();
  await expect(
    page.getByRole("heading", { name: "Derazalar", exact: true }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Quyi kategoriya qo'shish", exact: true })
    .click();
  await expect(dialog).toContainText("yana kategoriya qo'shmoqchimisiz?");
  await dialog.getByRole("button", { name: "Yo'q", exact: true }).click();
  await dialog.getByLabel("Ismi").fill("Ali usta");
  await dialog.getByLabel("Raqami").fill("+998 90 123 45 67");
  await dialog.getByLabel("Ma'lumot").fill("10 yillik tajriba");
  await dialog.getByRole("button", { name: "4 yulduz", exact: true }).click();
  await dialog.getByRole("button", { name: "Qo'shimcha input qo'shish" }).click();
  await dialog.getByLabel("Qo'shimcha ma'lumot 1", { exact: true }).fill("Toshkent bo'ylab ishlaydi");
  await dialog.getByRole("button", { name: "Saqlash", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Ali usta" })).toBeVisible();
  await expect(page.getByText("Toshkent bo'ylab ishlaydi")).toBeVisible();
  await page.getByLabel("Ali usta: amallar").click();
  await page.getByRole("button", { name: "Tahrirlash", exact: true }).click();
  await dialog.getByLabel("Ismi").fill("Vali usta");
  await dialog.getByRole("button", { name: "5 yulduz", exact: true }).click();
  await dialog.getByRole("button", { name: "Saqlash", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Vali usta" })).toBeVisible();
  await page.getByLabel("Vali usta: amallar").click();
  await page.getByRole("button", { name: "O'chirish", exact: true }).click();
  await dialog.getByRole("button", { name: "O'chirish", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Vali usta" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Quyi kategoriya qo'shish", exact: true })
    .click();
  await dialog.getByRole("button", { name: "Ha, qo'shish" }).click();
  await dialog.getByLabel("Kategoriya nomi").fill("Plastik");
  await dialog.getByRole("button", { name: "Qo'shish", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await page.getByRole("link", { name: "Plastik: ochish" }).click();
  await expect(
    page.getByRole("heading", { name: "Plastik", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Quyi kategoriya qo'shish", exact: true })
    .click();
  await dialog.getByRole("button", { name: "Ha, qo'shish" }).click();
  await dialog.getByLabel("Kategoriya nomi").fill("Oq rang");
  await dialog.getByRole("button", { name: "Qo'shish", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await page.getByRole("link", { name: "Oq rang: ochish" }).click();
  await expect(
    page.getByRole("button", { name: "Quyi kategoriya qo'shish", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByText("3-pog'onaga yetdingiz. Bu eng quyi daraja."),
  ).toBeVisible();
  const breadcrumbs = page.getByRole("navigation", {
    name: "Kategoriya yo'li",
  });
  await expect(
    breadcrumbs.getByRole("link", { name: "Derazalar", exact: true }),
  ).toBeVisible();
  await breadcrumbs
    .getByRole("link", { name: "Category", exact: true })
    .click();
  await page.getByLabel("Derazalar: amallar").click();
  await page.getByRole("button", { name: "Tahrirlash", exact: true }).click();
  await expect(dialog.getByLabel("Kategoriya nomi")).toHaveValue("Derazalar");
  await dialog.getByLabel("Kategoriya nomi").fill("Oynalar");
  await dialog.getByRole("button", { name: "Saqlash", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("link", { name: "Oynalar: ochish" }),
  ).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("categories.png") });

  await page.getByLabel("Oynalar: amallar").click();
  await page.getByRole("button", { name: "O'chirish", exact: true }).click();
  await expect(dialog).toContainText(
    "Ichidagi 2 ta quyi kategoriya ham o'chiriladi.",
  );
  await dialog.getByRole("button", { name: "Bekor qilish" }).click();
  await expect(
    page.getByRole("link", { name: "Oynalar: ochish" }),
  ).toBeVisible();
  await page.getByLabel("Oynalar: amallar").click();
  await page.getByRole("button", { name: "O'chirish", exact: true }).click();
  await dialog.getByRole("button", { name: "O'chirish", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Birinchi kategoriyangizni yarating" }),
  ).toBeVisible();
});

test("duplicate names preserve the form and concurrent deletion offers a route back", async ({
  page,
}) => {
  const id = "a".repeat(24);
  const mock = await mockCategories(page, [
    { id, name: "Derazalar", parentId: null, level: 1 },
  ]);
  await page.goto("/categories/");
  await page
    .getByRole("button", { name: "Kategoriya qo'shish", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Kategoriya nomi").fill("Derazalar");
  await dialog.getByRole("button", { name: "Qo'shish", exact: true }).click();
  await expect(dialog.getByRole("alert")).toContainText(
    "shu nomli kategoriya mavjud",
  );
  await expect(dialog.getByLabel("Kategoriya nomi")).toHaveValue("Derazalar");
  await dialog.getByRole("button", { name: "Bekor qilish" }).click();
  await page.getByRole("link", { name: "Derazalar: ochish" }).click();
  await expect(page).toHaveURL(new RegExp(`parent=${id}`));
  mock.clear();
  await page.reload();
  await expect(
    page.getByText("Bu kategoriya o'chirilgan yoki mavjud emas."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Quyi kategoriya qo'shish", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("link", { name: "Kategoriyalarga qaytish" }).click();
  await expect(
    page.getByRole("heading", { name: "Birinchi kategoriyangizni yarating" }),
  ).toBeVisible();
});

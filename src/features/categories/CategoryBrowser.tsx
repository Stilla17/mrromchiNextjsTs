"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { getApiError } from "@/lib/api";
import { useCategories } from "./categories.hooks";
import {
  categoryHref,
  MAX_CATEGORY_LEVEL,
  type Category,
} from "./categories.types";
import CategoryDialog, { type CategoryDialogState } from "./CategoryDialog";
import { useMasters } from "@/features/masters/masters.hooks";
import MasterDialog, { type MasterDialogState } from "@/features/masters/MasterDialog";

export default function CategoryBrowser() {
  const parentId = useSearchParams().get("parent") || null;
  const query = useCategories();
  const mastersQuery = useMasters(parentId);
  const [dialog, setDialog] = useState<CategoryDialogState | null>(null);
  const [masterDialog, setMasterDialog] = useState<MasterDialogState | null>(null);
  const categories = query.data ?? [];
  const byId = new Map(categories.map((item) => [item.id, item]));
  const byParent = new Map<string | null, Category[]>();
  for (const category of categories) {
    const group = byParent.get(category.parentId) ?? [];
    group.push(category);
    byParent.set(category.parentId, group);
  }
  const parent = byId.get(parentId ?? "") ?? null;
  const masters = mastersQuery.data ?? [];
  const missingParent = Boolean(parentId && query.isSuccess && !parent);
  const children = byParent.get(parentId) ?? [];
  const canOpenAdd = query.isSuccess && !missingParent;
  const canAddCategory =
    canOpenAdd && (!parent || parent.level < MAX_CATEGORY_LEVEL);
  const path: Category[] = [];
  let ancestor = parent;
  while (ancestor && path.length < MAX_CATEGORY_LEVEL) {
    path.unshift(ancestor);
    ancestor = byId.get(ancestor.parentId ?? "") ?? null;
  }

  function descendants(id: string): number {
    const direct = byParent.get(id) ?? [];
    return direct.reduce(
      (count, item) =>
        count +
        1 +
        (item.level < MAX_CATEGORY_LEVEL ? descendants(item.id) : 0),
      0,
    );
  }

  function openMenu(state: CategoryDialogState, element: HTMLButtonElement) {
    element.closest("details")?.removeAttribute("open");
    setDialog(state);
  }

  function openMasterMenu(state: MasterDialogState, element: HTMLButtonElement) {
    element.closest("details")?.removeAttribute("open");
    setMasterDialog(state);
  }

  return (
    <main className="px-5 pt-6 pb-[calc(110px+env(safe-area-inset-bottom,0px)+var(--tg-content-safe-area-inset-bottom,0px))]">
      <Link
        href={parentId ? categoryHref(parent?.parentId ?? null) : "/home/"}
        className="mb-5 inline-flex min-h-10 items-center gap-2 text-[12px] text-[var(--mini-muted)]"
      >
        <ArrowLeft size={17} /> {parentId ? "Orqaga" : "Bosh sahifa"}
      </Link>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[10px] font-semibold tracking-[1.6px] text-[var(--mini-muted)]">
            UMUMIY KATEGORIYALAR
          </p>
          <h1 className="break-words text-[28px] font-bold tracking-[-1px]">
            {parent?.name ?? "Category"}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--mini-muted)]">
            {parent
              ? `${parent.level}-pog'ona · ${children.length} ta quyi kategoriya`
              : "Kategoriyalarni jamoangizga mos yarating va boshqaring."}
          </p>
        </div>

        {canOpenAdd && (
          <Button
            className="mt-5 min-h-11 shrink-0 rounded-xl px-3"
            aria-label={
              parent
                ? canAddCategory
                  ? "Quyi kategoriya qo'shish"
                  : "Usta qo'shish"
                : "Kategoriya qo'shish"
            }
            onClick={() => setDialog({ type: "create", parent })}
          >
            <Plus size={19} /> <span>Qo'shish</span>
          </Button>
        )}
      </div>

      {parent && (
        <nav
          aria-label="Kategoriya yo'li"
          className="mt-5 flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--mini-muted)]"
        >
          <Link
            href={categoryHref(null)}
            className="min-h-8 content-center underline-offset-4 hover:underline"
          >
            Category
          </Link>
          {path.map((item, index) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5"
            >
              <ChevronRight
                size={13}
                aria-hidden="true"
              />
              {index === path.length - 1 ? (
                <span
                  aria-current="page"
                  className="break-all font-semibold text-[var(--mini-text)]"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={categoryHref(item.id)}
                  className="min-h-8 content-center underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
      )}

      <section
        aria-label="Kategoriyalar ro'yxati"
        aria-busy={query.isFetching}
        className="mt-6 space-y-3"
      >
        {query.isPending && (
          <p
            role="status"
            className="py-10 text-center text-sm text-[var(--mini-muted)]"
          >
            Kategoriyalar yuklanmoqda...
          </p>
        )}
        {query.isError && (
          <div
            role="alert"
            className="space-y-3 rounded-2xl border border-red-500/20 p-4"
          >
            <p className="text-sm text-red-600 dark:text-red-400">
              {getApiError(query.error)}
            </p>
            <Button
              variant="secondary"
              disabled={query.isFetching}
              onClick={() => void query.refetch()}
            >
              Qayta urinish
            </Button>
          </div>
        )}
        {missingParent && (
          <div
            role="status"
            className="space-y-4 rounded-2xl bg-[var(--mini-card)] p-5 text-sm"
          >
            <p>Bu kategoriya o'chirilgan yoki mavjud emas.</p>
            <Link
              href={categoryHref(null)}
              className="inline-flex min-h-10 items-center gap-2 text-[var(--mini-accent)]"
            >
              <ArrowLeft size={16} /> Kategoriyalarga qaytish
            </Link>
          </div>
        )}
        {query.isSuccess &&
          !missingParent &&
          children.length === 0 &&
          masters.length === 0 &&
          (!parentId || !mastersQuery.isPending) && (
          <div className="flex flex-col items-center rounded-[18px] border border-dashed border-[#8da39540] px-5 py-10 text-center">
            <FolderOpen
              size={36}
              className="mb-4 text-[var(--mini-accent)]"
              aria-hidden="true"
            />
            <h2 className="text-[15px] font-semibold">
              {parent
                ? "Bu kategoriya hozircha bo'sh"
                : "Birinchi kategoriyangizni yarating"}
            </h2>
            <p className="mt-2 max-w-64 text-[12px] leading-relaxed text-[var(--mini-muted)]">
              {parent?.level === MAX_CATEGORY_LEVEL
                ? "3-pog'onaga yetdingiz. Bu eng quyi daraja. Yuqoridagi Qo'shish tugmasi orqali usta qo'shing."
                : parent
                  ? "Yuqoridagi Qo'shish tugmasi orqali kategoriya yoki usta qo'shing."
                : "Yuqoridagi Qo'shish tugmasi orqali yangi bo'lim yarating."}
            </p>
          </div>
        )}
        {query.isSuccess &&
          !missingParent &&
          children.map((category) => (
            <article
              key={category.id}
              className="relative flex items-center gap-2 rounded-[18px] border border-[#8da39520] bg-[var(--mini-card)] p-3"
            >
              <details className="relative shrink-0">
                <summary
                  aria-label={`${category.name}: amallar`}
                  className="grid size-10 cursor-pointer list-none place-items-center rounded-xl text-[var(--mini-muted)] hover:bg-[var(--mini-bg)] focus-visible:outline-2 focus-visible:outline-[var(--mini-accent)] [&::-webkit-details-marker]:hidden"
                >
                  <MoreVertical size={19} />
                </summary>
                <div className="absolute top-11 left-0 z-20 w-44 space-y-1 rounded-xl border border-[#8da39530] bg-[var(--mini-card)] p-1.5 shadow-lg">
                  <button
                    type="button"
                    onClick={(event) =>
                      openMenu(
                        { type: "rename", category },
                        event.currentTarget,
                      )
                    }
                    className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-[12px] hover:bg-[var(--mini-bg)]"
                  >
                    <Pencil size={15} /> Tahrirlash
                  </button>
                  <button
                    type="button"
                    onClick={(event) =>
                      openMenu(
                        { type: "delete", category },
                        event.currentTarget,
                      )
                    }
                    className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-[12px] text-red-600 hover:bg-red-500/10 dark:text-red-400"
                  >
                    <Trash2 size={15} /> O'chirish
                  </button>
                </div>
              </details>
              <Link
                href={categoryHref(category.id)}
                aria-label={`${category.name}: ochish`}
                className="flex min-h-14 min-w-0 flex-1 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-[var(--mini-accent)]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--mini-bg)] text-[var(--mini-accent)]">
                  <Folder
                    size={21}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-[14px] font-semibold">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-[11px] text-[var(--mini-muted)]">
                    {category.level}-pog'ona ·{" "}
                    {byParent.get(category.id)?.length ?? 0} ta quyi kategoriya
                  </p>
                </div>
                <ChevronRight
                  size={19}
                  className="shrink-0 text-[var(--mini-muted)]"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
      </section>

      {parent && (
        <section aria-label="Ustalar ro'yxati" className="mt-7 space-y-3">
          <h2 className="text-[15px] font-semibold">Ustalar</h2>
          {mastersQuery.isPending && (
            <p role="status" className="py-4 text-sm text-[var(--mini-muted)]">
              Ustalar yuklanmoqda...
            </p>
          )}
          {mastersQuery.isError && (
            <div role="alert" className="space-y-3 rounded-2xl border border-red-500/20 p-4">
              <p className="text-sm text-red-600 dark:text-red-400">
                {getApiError(mastersQuery.error)}
              </p>
              <Button variant="secondary" onClick={() => void mastersQuery.refetch()}>
                Qayta urinish
              </Button>
            </div>
          )}
          {masters.map((master) => (
            <article
              key={master.id}
              className="relative rounded-[18px] border border-[#8da39520] bg-[var(--mini-card)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-[15px] font-semibold">{master.name}</h3>
                  <a
                    href={`tel:${master.phone.replace(/\D/g, "")}`}
                    className="mt-2 inline-flex items-center gap-2 text-[12px] text-[var(--mini-accent)]"
                  >
                    <Phone size={15} /> {master.phone}
                  </a>
                </div>
                <div className="flex shrink-0 items-start gap-1">
                  <div className="flex min-h-10 items-center gap-1 text-amber-500" aria-label={`${master.rating} yulduz`}>
                    <Star size={17} fill="currentColor" />
                    <span className="text-[12px] font-semibold">{master.rating}</span>
                  </div>
                  <details className="relative">
                    <summary
                      aria-label={`${master.name}: amallar`}
                      className="grid size-10 cursor-pointer list-none place-items-center rounded-xl text-[var(--mini-muted)] hover:bg-[var(--mini-bg)] focus-visible:outline-2 focus-visible:outline-[var(--mini-accent)] [&::-webkit-details-marker]:hidden"
                    >
                      <MoreVertical size={19} />
                    </summary>
                    <div className="absolute top-11 right-0 z-20 w-44 space-y-1 rounded-xl border border-[#8da39530] bg-[var(--mini-card)] p-1.5 shadow-lg">
                      <button
                        type="button"
                        onClick={(event) => openMasterMenu({ type: "edit", master }, event.currentTarget)}
                        className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-[12px] hover:bg-[var(--mini-bg)]"
                      >
                        <Pencil size={15} /> Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={(event) => openMasterMenu({ type: "delete", master }, event.currentTarget)}
                        className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-[12px] text-red-600 hover:bg-red-500/10 dark:text-red-400"
                      >
                        <Trash2 size={15} /> O'chirish
                      </button>
                    </div>
                  </details>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-[12px] leading-relaxed text-[var(--mini-muted)]">
                {master.description}
              </p>
              {master.extraDetails.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-[12px] text-[var(--mini-muted)]">
                  {master.extraDetails.map((detail, index) => (
                    <li key={index} className="rounded-lg bg-[var(--mini-bg)] px-3 py-2">
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      )}

      {parent?.level === MAX_CATEGORY_LEVEL && (
        <p className="mt-5 text-center text-[12px] text-[var(--mini-muted)]">
          Kategoriyalar 3 pog'onagacha qo'shiladi. Bu bo'limga usta qo'shishingiz mumkin.
        </p>
      )}
      {dialog && (
        <CategoryDialog
          state={dialog}
          descendantCount={
            dialog.type === "delete" ? descendants(dialog.category.id) : 0
          }
          onDismiss={() => setDialog(null)}
        />
      )}
      {masterDialog && (
        <MasterDialog
          state={masterDialog}
          onDismiss={() => setMasterDialog(null)}
        />
      )}
    </main>
  );
}

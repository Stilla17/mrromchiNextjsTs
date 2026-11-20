"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Pencil,
  Phone,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import Header from "@/components/WebAppCompnonents/Header";
import Button from "@/components/ui/Button";
import { useUsers } from "@/features/users/users.hooks";
import type { User } from "@/features/users/users.types";
import { getApiError } from "@/lib/api";

import ModalBlock, {
  type Panel,
} from "@/components/WebAppCompnonents/ModalBlock";

const focusClass =
  "cursor-pointer transition-transform active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mini-accent)]";

export default function UsersPage() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [panel, setPanel] = useState<Panel>("create");
  const [selected, setSelected] = useState<User | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [page, setPage] = useState(1);
  const users = useUsers(page);
  const people = users.data?.data ?? [];
  const pagination = users.data?.pagination;

  // Deleting the last item of the last page returns to the previous page.
  useEffect(() => {
    if (pagination && page > Math.max(1, pagination.totalPages)) {
      setPage(Math.max(1, pagination.totalPages));
    }
  }, [page, pagination]);

  function openPanel(next: Panel, person: User | null = null) {
    setPanel(next);
    setSelected(person);
    setAnimationKey((value) => value + 1);
    dialog.current?.showModal();
  }

  const title = {
    create: "Yangi foydalanuvchi",
    view: "Foydalanuvchi ma’lumotlari",
    edit: "Foydalanuvchini tahrirlash",
    delete: "Foydalanuvchini o‘chirish",
  }[panel];

  return (
    <>
      <Header />
      <main className="px-5 pt-6 pb-[calc(96px+env(safe-area-inset-bottom,0px)+var(--tg-content-safe-area-inset-bottom,0px))]">
        <Link
          href="/home/"
          className={`${focusClass} mb-6 inline-flex min-h-10 items-center gap-2 text-[12px] text-[var(--mini-muted)]`}
        >
          <ArrowLeft size={17} /> Bosh sahifa
        </Link>

        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-[10px] font-semibold tracking-[1.6px] text-[var(--mini-muted)]">
              FOYDALANUVCHILAR BOSHQARUVI
            </p>
            <h1 className="text-[28px] font-bold tracking-[-1px]">
              Foydalanuvchilar
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--mini-muted)]">
              Ro‘yxat va foydalanuvchi ma’lumotlarini boshqaring.
            </p>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--mini-accent)_10%,var(--mini-card))] text-[var(--mini-accent)]">
            <Users
              size={22}
              aria-hidden="true"
            />
          </span>
        </div>

        <button
          type="button"
          onClick={() => openPanel("create")}
          disabled={!users.isSuccess || users.isError}
          className={`${focusClass} flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[var(--mini-accent)] px-4 text-[13px] font-semibold text-[var(--mini-button-text)] shadow-sm disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <Plus size={19} /> Foydalanuvchi qo‘shish
        </button>

        <section
          className="mt-7"
          aria-labelledby="users-heading"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="users-heading"
              className="text-[14px] font-semibold"
            >
              Foydalanuvchilar ro‘yxati
            </h2>
            <span className="rounded-lg bg-[var(--mini-card)] px-2.5 py-1 text-[11px] text-[var(--mini-muted)]">
              {pagination ? `${pagination.total} ta` : "—"}
            </span>
          </div>
          {users.isPending && (
            <p
              role="status"
              className="py-8 text-center text-sm text-[var(--mini-muted)]"
            >
              Foydalanuvchilar yuklanmoqda...
            </p>
          )}
          {users.isError && (
            <div
              role="alert"
              className="space-y-3 rounded-2xl border border-red-500/20 p-4"
            >
              <p className="text-sm text-red-600 dark:text-red-400">
                {getApiError(users.error)}
              </p>
              <Button
                variant="secondary"
                disabled={users.isFetching}
                onClick={() => void users.refetch()}
              >
                Qayta urinish
              </Button>
            </div>
          )}
          {users.isSuccess && people.length === 0 && (
            <p
              role="status"
              className="py-8 text-center text-sm text-[var(--mini-muted)]"
            >
              Hozircha foydalanuvchilar yo'q.
            </p>
          )}
          <div
            className="space-y-3"
            aria-busy={users.isFetching}
          >
            {!users.isError &&
              people.map((person) => (
                <article
                  key={person.id}
                  className="rounded-[18px] border border-[#8da39520] bg-[var(--mini-card)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-[color-mix(in_srgb,var(--mini-accent)_9%,var(--mini-card))] text-[13px] font-semibold text-[var(--mini-accent)]">
                      {person.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-[14px] font-semibold">
                        {person.name}
                      </h3>
                      <a
                        href={`tel:${person.phone.replace(/\D/g, "")}`}
                        className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--mini-muted)] hover:text-[var(--mini-accent)]"
                      >
                        <Phone
                          size={12}
                          aria-hidden="true"
                        />{" "}
                        {person.phone}
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#8da39520] pt-3">
                    <button
                      type="button"
                      onClick={() => openPanel("view", person)}
                      aria-label={`${person.name}: ko‘rish`}
                      className={`${focusClass} flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-[var(--mini-bg)] text-[11px] text-[var(--mini-muted)]`}
                    >
                      <Eye size={15} /> Ko‘rish
                    </button>
                    <button
                      type="button"
                      onClick={() => openPanel("edit", person)}
                      aria-label={`${person.name}: tahrirlash`}
                      className={`${focusClass} flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-[color-mix(in_srgb,var(--mini-accent)_8%,var(--mini-card))] text-[11px] text-[var(--mini-accent)]`}
                    >
                      <Pencil size={15} /> Tahrirlash
                    </button>
                    <button
                      type="button"
                      onClick={() => openPanel("delete", person)}
                      aria-label={`${person.name}: o‘chirish`}
                      className={`${focusClass} flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-red-500/10 text-[11px] text-red-600 dark:text-red-400`}
                    >
                      <Trash2 size={15} /> O‘chirish
                    </button>
                  </div>
                </article>
              ))}
          </div>
          {pagination && pagination.totalPages > 1 && (
            <nav
              aria-label="Ro'yxat sahifalari"
              className="mt-5 flex items-center justify-between gap-3"
            >
              <Button
                variant="secondary"
                disabled={page === 1 || users.isFetching}
                onClick={() => setPage((value) => value - 1)}
              >
                Oldingi
              </Button>
              <span
                aria-live="polite"
                className="text-xs text-[var(--mini-muted)]"
              >
                {page} / {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                disabled={page >= pagination.totalPages || users.isFetching}
                onClick={() => setPage((value) => value + 1)}
              >
                Keyingi
              </Button>
            </nav>
          )}
        </section>
      </main>
      <ModalBlock
        dialogRef={dialog}
        title={title}
        panel={panel}
        selected={selected}
        onEdit={(person) => openPanel("edit", person)}
        animationKey={animationKey}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

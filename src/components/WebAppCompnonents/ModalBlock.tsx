"use client";

import type { FormEvent, RefObject } from "react";
import { Pencil, Plus, Trash2, UserRound, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
} from "@/features/users/users.hooks";
import type { User } from "@/features/users/users.types";
import { getApiError } from "@/lib/api";

export type Panel = "create" | "view" | "edit" | "delete";

type ModalBlockProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  title: string;
  panel: Panel;
  selected: User | null;
  onEdit: (person: User) => void;
  onClose: () => void;
  animationKey: number;
};

export default function ModalBlock({
  dialogRef,
  title,
  panel,
  selected,
  onEdit,
  onClose,
  animationKey,
}: ModalBlockProps) {
  const reduceMotion = useReducedMotion();
  const detail = useUser(panel === "create" ? undefined : selected?.id);
  const create = useCreateUser();
  const update = useUpdateUser();
  const remove = useDeleteUser();
  const pending = create.isPending || update.isPending || remove.isPending;
  const error = create.error ?? update.error ?? remove.error;
  const user = detail.data;

  function close() {
    if (!pending) dialogRef.current?.close();
  }

  function reset() {
    create.reset();
    update.reset();
    remove.reset();
    onClose();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const input = {
      fullName: String(form.get("fullName") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
    };
    try {
      if (panel === "create") await create.mutateAsync(input);
      else if (user) await update.mutateAsync({ id: user.id, input });
      else return;
      dialogRef.current?.close();
    } catch {
      // Mutation errors stay visible in the dialog; preserve the entered fields.
    }
  }

  async function confirmDelete() {
    if (!user || pending) return;
    try {
      await remove.mutateAsync(user.id);
      dialogRef.current?.close();
    } catch {
      // The mutation exposes the server error below.
    }
  }

  const ready = panel === "create" || (user && !detail.isError);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="user-dialog-title"
      aria-describedby="user-dialog-description"
      aria-busy={pending}
      onClose={reset}
      onCancel={(event) => {
        if (pending) event.preventDefault();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-[90dvh] w-full max-w-[480px] overflow-y-auto overscroll-contain rounded-t-[24px] border border-[#8da39520] bg-[var(--mini-card)] px-5 pt-3 pb-[max(24px,env(safe-area-inset-bottom))] text-[var(--mini-text)] backdrop:bg-black/45 backdrop:backdrop-blur-sm"
    >
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
      >
        <div className="mx-auto mb-5 h-1 w-9 rounded-full bg-[#8da39550]" />
        <div className="flex items-center justify-between gap-3">
          <h2
            id="user-dialog-title"
            className="text-[19px] font-semibold tracking-tight"
          >
            {title}
          </h2>
          <Button
            onClick={close}
            disabled={pending}
            aria-label="Oynani yopish"
            variant="icon"
          >
            <X size={20} />
          </Button>
        </div>
        <p
          id="user-dialog-description"
          className="mt-2 text-[12px] leading-relaxed text-[var(--mini-muted)]"
        >
          {panel === "delete"
            ? "Foydalanuvchi o'chiriladi va uning tizimga kirishi cheklanadi."
            : panel === "view"
              ? "Foydalanuvchining asosiy ma'lumotlari."
              : "Foydalanuvchining ism va telefon raqamini kiriting."}
        </p>

        {panel !== "create" && detail.isPending && (
          <p
            role="status"
            className="py-6 text-sm"
          >
            Yuklanmoqda...
          </p>
        )}
        {panel !== "create" && detail.isError && (
          <div
            role="alert"
            className="mt-5 space-y-3 text-sm"
          >
            <p className="text-red-600 dark:text-red-400">
              {getApiError(detail.error)}
            </p>
            <Button
              variant="secondary"
              disabled={detail.isFetching}
              onClick={() => void detail.refetch()}
            >
              Qayta urinish
            </Button>
          </div>
        )}
        {error && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-600 dark:text-red-400"
          >
            {getApiError(error)}
          </p>
        )}

        {ready && (panel === "create" || panel === "edit") && (
          <form
            key={`${panel}-${selected?.id ?? "new"}`}
            onSubmit={submit}
            className="mt-6"
          >
            <fieldset
              disabled={pending}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="user-name"
                  className="text-[12px] font-semibold"
                >
                  Ism va familiya
                </label>
                <Input
                  id="user-name"
                  name="fullName"
                  required
                  autoComplete="name"
                  maxLength={120}
                  placeholder="Ism va familiyani kiriting"
                  defaultValue={panel === "edit" ? user?.name : ""}
                />
              </div>
              <div>
                <label
                  htmlFor="user-phone"
                  className="text-[12px] font-semibold"
                >
                  Telefon raqami
                </label>
                <PhoneInput
                  id="user-phone"
                  name="phone"
                  defaultValue={panel === "edit" ? user?.phone : ""}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={close}
                  disabled={pending}
                  variant="secondary"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  disabled={pending}
                >
                  {panel === "create" ? (
                    <Plus size={17} />
                  ) : (
                    <Pencil size={17} />
                  )}
                  {pending
                    ? "Saqlanmoqda..."
                    : panel === "create"
                      ? "Qo'shish"
                      : "Saqlash"}
                </Button>
              </div>
            </fieldset>
          </form>
        )}

        {ready && panel === "view" && user && (
          <div className="mt-6">
            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-[var(--mini-bg)] p-4">
              <UserRound
                size={26}
                className="shrink-0 text-[var(--mini-accent)]"
              />
              <span className="text-[15px] font-semibold">{user.name}</span>
            </div>
            <dl className="space-y-4 text-[13px]">
              <div>
                <dt className="text-[11px] text-[var(--mini-muted)]">
                  Telefon raqami
                </dt>
                <dd className="mt-1 font-medium">
                  <a
                    href={`tel:${user.phone.replace(/\D/g, "")}`}
                    className="hover:text-[var(--mini-accent)]"
                  >
                    {user.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-[var(--mini-muted)]">Holati</dt>
                <dd className="mt-1 font-medium">
                  {user.status === "active" ? "Faol" : "Bloklangan"}
                </dd>
              </div>
            </dl>
            <Button
              onClick={() => onEdit(user)}
              variant="secondary"
              className="mt-6 w-full text-[var(--mini-accent)]"
            >
              <Pencil size={17} /> Tahrirlash
            </Button>
          </div>
        )}

        {ready && panel === "delete" && user && (
          <div className="mt-6">
            <div className="flex items-center gap-3 rounded-2xl bg-red-500/10 p-4">
              <Trash2
                size={23}
                className="shrink-0 text-red-600 dark:text-red-400"
              />
              <div>
                <p className="text-[14px] font-semibold">{user.name}</p>
                <p className="mt-1 text-[12px] text-[var(--mini-muted)]">
                  {user.phone}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed">
              Ushbu foydalanuvchini o'chirishni tasdiqlaysizmi?
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                onClick={close}
                disabled={pending}
                variant="secondary"
              >
                Bekor qilish
              </Button>
              <Button
                onClick={() => void confirmDelete()}
                disabled={pending}
                variant="danger"
              >
                <Trash2 size={17} />{" "}
                {pending ? "O'chirilmoqda..." : "O'chirish"}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </dialog>
  );
}

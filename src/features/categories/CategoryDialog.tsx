"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { FolderPlus, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import { getApiError } from "@/lib/api";
import { useCategoryMutations } from "./categories.hooks";
import { MAX_CATEGORY_LEVEL, type Category } from "./categories.types";
import { useMasterMutations } from "@/features/masters/masters.hooks";

export type CategoryDialogState =
  | { type: "create"; parent: Category | null }
  | { type: "rename" | "delete"; category: Category };

type Props = {
  state: CategoryDialogState;
  descendantCount: number;
  onDismiss: () => void;
};

export default function CategoryDialog({
  state,
  descendantCount,
  onDismiss,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"choice" | "category" | "master">(() => {
    if (state.type !== "create" || !state.parent) return "category";
    return state.parent.level >= MAX_CATEGORY_LEVEL ? "master" : "choice";
  });
  const [rating, setRating] = useState(5);
  const [extraDetails, setExtraDetails] = useState<string[]>([]);
  const mutations = useCategoryMutations();
  const masterMutations = useMasterMutations(
    state.type === "create" ? state.parent?.id ?? null : null,
  );
  const pending =
    mutations.create.isPending ||
    mutations.rename.isPending ||
    mutations.remove.isPending ||
    masterMutations.create.isPending;
  const error =
    masterMutations.create.error ??
    mutations.create.error ??
    mutations.rename.error ??
    mutations.remove.error;
  const deleting = state.type === "delete";
  const title = mode === "choice"
    ? "Quyi kategoriya qo'shish"
    : mode === "master"
      ? "Yangi usta"
    : deleting
      ? "Kategoriyani o'chirish"
      : state.type === "rename"
        ? "Kategoriya nomini o'zgartirish"
        : "Yangi kategoriya";

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function close() {
    if (!pending) dialog.current?.close();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const name = String(
      new FormData(event.currentTarget).get("name") ?? "",
    ).trim();
    if (!deleting && !name) {
      const input = event.currentTarget.elements.namedItem(
        "name",
      ) as HTMLInputElement;
      input.setCustomValidity("Kategoriya nomini kiriting.");
      input.reportValidity();
      return;
    }
    try {
      if (state.type === "create")
        await mutations.create.mutateAsync({
          name,
          parentId: state.parent?.id ?? null,
        });
      if (state.type === "rename")
        await mutations.rename.mutateAsync({ id: state.category.id, name });
      if (state.type === "delete")
        await mutations.remove.mutateAsync(state.category.id);
      dialog.current?.close();
    } catch {
      // Preserve the form; the mutation supplies the error message.
    }
  }

  async function submitMaster(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || state.type !== "create" || !state.parent) return;
    const form = new FormData(event.currentTarget);
    try {
      await masterMutations.create.mutateAsync({
        categoryId: state.parent.id,
        name: String(form.get("masterName") ?? "").trim(),
        phone: String(form.get("phone") ?? "").trim(),
        description: String(form.get("description") ?? "").trim(),
        rating,
        extraDetails: form
          .getAll("extraDetails")
          .map(String)
          .map((value) => value.trim())
          .filter(Boolean),
      });
      dialog.current?.close();
    } catch {
      // Preserve the form; the mutation supplies the error message.
    }
  }

  return (
    <dialog
      ref={dialog}
      onClose={onDismiss}
      onCancel={(event) => {
        if (pending) event.preventDefault();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      aria-labelledby="category-dialog-title"
      aria-describedby="category-dialog-description"
      aria-busy={pending}
      className="fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-[90dvh] w-full max-w-[480px] overflow-y-auto overscroll-contain rounded-t-[24px] border border-[#8da39520] bg-[var(--mini-card)] px-5 pt-3 pb-[max(24px,env(safe-area-inset-bottom))] text-[var(--mini-text)] backdrop:bg-black/45 backdrop:backdrop-blur-sm"
    >
      <motion.div
        key={`${state.type}-${mode}`}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
      >
      <div className="mx-auto mb-5 h-1 w-9 rounded-full bg-[#8da39550]" />
      <div className="flex items-center justify-between gap-3">
        <h2
          id="category-dialog-title"
          className="text-[19px] font-semibold"
        >
          {title}
        </h2>
        <Button
          variant="icon"
          aria-label="Oynani yopish"
          onClick={close}
          disabled={pending}
        >
          <X size={20} />
        </Button>
      </div>
      <p
        id="category-dialog-description"
        className="mt-2 text-[13px] leading-relaxed text-[var(--mini-muted)]"
      >
        {mode === "choice" && state.type === "create"
          ? `“${state.parent?.name}” ichiga yana kategoriya qo'shmoqchimisiz?`
          : mode === "master"
            ? `“${state.type === "create" ? state.parent?.name : ""}” ichiga usta ma'lumotlarini kiriting.`
          : deleting
            ? `“${state.category.name}” kategoriyasini o'chirishni tasdiqlaysizmi?`
            : "Nomini o'zingizga mos kiriting. O'zgarishlar barcha foydalanuvchilarga ko'rinadi."}
      </p>

      {mode === "choice" ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={() => setMode("master")}
          >
            Yo'q
          </Button>
          <Button onClick={() => setMode("category")}>
            <FolderPlus size={18} /> Ha, qo'shish
          </Button>
        </div>
      ) : mode === "master" ? (
        <form
          onSubmit={submitMaster}
          className="mt-6 space-y-5"
        >
          <div>
            <label htmlFor="master-name" className="text-[12px] font-semibold">Ismi</label>
            <Input id="master-name" name="masterName" required maxLength={100} disabled={pending} placeholder="Ustaning ismi" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="master-phone" className="text-[12px] font-semibold">Raqami</label>
            <PhoneInput id="master-phone" name="phone" disabled={pending} />
          </div>
          <div>
            <label htmlFor="master-description" className="text-[12px] font-semibold">Ma'lumot</label>
            <textarea
              id="master-description"
              name="description"
              required
              maxLength={1000}
              disabled={pending}
              placeholder="Usta haqida ma'lumot"
              className="mt-2 min-h-28 w-full resize-y rounded-xl border border-[#8da39530] bg-[var(--mini-bg)] px-4 py-3 text-[16px] text-[var(--mini-text)] outline-none focus:border-[var(--mini-accent)] disabled:opacity-50"
            />
          </div>
          <fieldset>
            <legend className="text-[12px] font-semibold">Reyting</legend>
            <div className="mt-2 flex gap-1" aria-label={`${rating} yulduz`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} yulduz`}
                  aria-pressed={rating === value}
                  disabled={pending}
                  onClick={() => setRating(value)}
                  className="grid size-11 cursor-pointer place-items-center rounded-xl text-amber-500 focus-visible:outline-2 focus-visible:outline-[var(--mini-accent)]"
                >
                  <Star size={25} fill={value <= rating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </fieldset>
          {extraDetails.map((_, index) => (
            <div key={index}>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor={`extra-detail-${index}`} className="text-[12px] font-semibold">
                  Qo'shimcha ma'lumot {index + 1}
                </label>
                <button
                  type="button"
                  aria-label={`Qo'shimcha ma'lumot ${index + 1} ni o'chirish`}
                  onClick={() => setExtraDetails((items) => items.filter((_, itemIndex) => itemIndex !== index))}
                  className="grid size-8 cursor-pointer place-items-center rounded-lg text-[var(--mini-muted)]"
                >
                  <X size={16} />
                </button>
              </div>
              <Input id={`extra-detail-${index}`} name="extraDetails" required maxLength={300} disabled={pending} placeholder="Qo'shimcha ma'lumot" />
            </div>
          ))}
          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">{getApiError(error)}</p>
          )}
          <div className="flex items-center justify-between gap-3 pt-1">
            <Button
              variant="secondary"
              aria-label="Qo'shimcha input qo'shish"
              disabled={pending || extraDetails.length >= 10}
              onClick={() => setExtraDetails((items) => [...items, ""])}
              className="size-12 px-0"
            >
              <Plus size={20} />
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={submit}
          className="mt-6"
        >
          {deleting ? (
            <p className="rounded-xl bg-red-500/10 p-4 text-[13px] leading-relaxed text-red-600 dark:text-red-400">
              {descendantCount > 0
                ? `Ichidagi ${descendantCount} ta quyi kategoriya ham o'chiriladi. `
                : ""}
              Bu amalni qaytarib bo'lmaydi.
            </p>
          ) : (
            <div>
              <label
                htmlFor="category-name"
                className="text-[12px] font-semibold"
              >
                Kategoriya nomi
              </label>
              <Input
                id="category-name"
                name="name"
                required
                maxLength={100}
                disabled={pending}
                defaultValue={
                  state.type === "rename" ? state.category.name : ""
                }
                onInput={(event) => event.currentTarget.setCustomValidity("")}
                placeholder="Masalan: Derazalar"
                autoComplete="off"
              />
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
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={close}
              disabled={pending}
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              variant={deleting ? "danger" : "primary"}
              disabled={pending}
            >
              {deleting ? (
                <Trash2 size={17} />
              ) : state.type === "rename" ? (
                <Pencil size={17} />
              ) : (
                <FolderPlus size={17} />
              )}
              {pending
                ? "Bajarilmoqda..."
                : deleting
                  ? "O'chirish"
                  : state.type === "rename"
                    ? "Saqlash"
                    : "Qo'shish"}
            </Button>
          </div>
        </form>
      )}
      </motion.div>
    </dialog>
  );
}

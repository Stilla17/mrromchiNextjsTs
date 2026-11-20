"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus, Star, Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import { getApiError } from "@/lib/api";
import { useMasterMutations } from "./masters.hooks";
import type { Master } from "./masters.types";

export type MasterDialogState = {
  type: "edit" | "delete";
  master: Master;
};

type Props = {
  state: MasterDialogState;
  onDismiss: () => void;
};

export default function MasterDialog({ state, onDismiss }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();
  const [rating, setRating] = useState(state.master.rating);
  const [extraDetails, setExtraDetails] = useState(state.master.extraDetails);
  const mutations = useMasterMutations(state.master.categoryId);
  const pending = mutations.update.isPending || mutations.remove.isPending;
  const error = mutations.update.error ?? mutations.remove.error;

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function close() {
    if (!pending) dialog.current?.close();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    try {
      await mutations.update.mutateAsync({
        id: state.master.id,
        input: {
          name: String(form.get("masterName") ?? "").trim(),
          phone: String(form.get("phone") ?? "").trim(),
          description: String(form.get("description") ?? "").trim(),
          rating,
          extraDetails: form.getAll("extraDetails").map(String).map((value) => value.trim()).filter(Boolean),
        },
      });
      dialog.current?.close();
    } catch {
      // Mutation error remains visible and the entered values are preserved.
    }
  }

  async function remove() {
    if (pending) return;
    try {
      await mutations.remove.mutateAsync(state.master.id);
      dialog.current?.close();
    } catch {
      // Mutation error is rendered below.
    }
  }

  return (
    <dialog
      ref={dialog}
      onClose={onDismiss}
      onCancel={(event) => pending && event.preventDefault()}
      onClick={(event) => event.target === event.currentTarget && close()}
      aria-labelledby="master-dialog-title"
      aria-describedby="master-dialog-description"
      aria-busy={pending}
      className="fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-[90dvh] w-full max-w-[480px] overflow-y-auto overscroll-contain rounded-t-[24px] border border-[#8da39520] bg-[var(--mini-card)] px-5 pt-3 pb-[max(24px,env(safe-area-inset-bottom))] text-[var(--mini-text)] backdrop:bg-black/45 backdrop:backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
      >
        <div className="mx-auto mb-5 h-1 w-9 rounded-full bg-[#8da39550]" />
        <div className="flex items-center justify-between gap-3">
          <h2 id="master-dialog-title" className="text-[19px] font-semibold">
            {state.type === "edit" ? "Ustani tahrirlash" : "Ustani o'chirish"}
          </h2>
          <Button variant="icon" aria-label="Oynani yopish" onClick={close} disabled={pending}>
            <X size={20} />
          </Button>
        </div>
        <p id="master-dialog-description" className="mt-2 text-[13px] leading-relaxed text-[var(--mini-muted)]">
          {state.type === "edit"
            ? "Usta ma'lumotlarini o'zgartirib, qayta saqlang."
            : `“${state.master.name}” ma'lumotlarini o'chirishni tasdiqlaysizmi?`}
        </p>

        {state.type === "delete" ? (
          <div className="mt-6">
            <p className="rounded-xl bg-red-500/10 p-4 text-[13px] text-red-600 dark:text-red-400">
              Bu amalni qaytarib bo'lmaydi.
            </p>
            {error && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{getApiError(error)}</p>}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={close} disabled={pending}>Bekor qilish</Button>
              <Button variant="danger" onClick={() => void remove()} disabled={pending}>
                <Trash2 size={17} /> {pending ? "O'chirilmoqda..." : "O'chirish"}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="edit-master-name" className="text-[12px] font-semibold">Ismi</label>
              <Input id="edit-master-name" name="masterName" required maxLength={100} disabled={pending} defaultValue={state.master.name} />
            </div>
            <div>
              <label htmlFor="edit-master-phone" className="text-[12px] font-semibold">Raqami</label>
              <PhoneInput id="edit-master-phone" name="phone" defaultValue={state.master.phone} disabled={pending} />
            </div>
            <div>
              <label htmlFor="edit-master-description" className="text-[12px] font-semibold">Ma'lumot</label>
              <textarea
                id="edit-master-description"
                name="description"
                required
                maxLength={1000}
                disabled={pending}
                defaultValue={state.master.description}
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
            {extraDetails.map((detail, index) => (
              <div key={index}>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor={`edit-extra-detail-${index}`} className="text-[12px] font-semibold">Qo'shimcha ma'lumot {index + 1}</label>
                  <button
                    type="button"
                    aria-label={`Qo'shimcha ma'lumot ${index + 1} ni o'chirish`}
                    onClick={() => setExtraDetails((items) => items.filter((_, itemIndex) => itemIndex !== index))}
                    className="grid size-8 cursor-pointer place-items-center rounded-lg text-[var(--mini-muted)]"
                  ><X size={16} /></button>
                </div>
                <Input id={`edit-extra-detail-${index}`} name="extraDetails" required maxLength={300} disabled={pending} defaultValue={detail} />
              </div>
            ))}
            {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{getApiError(error)}</p>}
            <div className="flex items-center justify-between gap-3 pt-1">
              <Button
                variant="secondary"
                aria-label="Qo'shimcha input qo'shish"
                disabled={pending || extraDetails.length >= 10}
                onClick={() => setExtraDetails((items) => [...items, ""])}
                className="size-12 px-0"
              ><Plus size={20} /></Button>
              <Button type="submit" disabled={pending}>{pending ? "Saqlanmoqda..." : "Saqlash"}</Button>
            </div>
          </form>
        )}
      </motion.div>
    </dialog>
  );
}

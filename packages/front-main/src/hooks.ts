import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { submitForm } from "./remotes";

export function useSubmit(
  options?: Omit<
    UseMutationOptions<{ ok: boolean }, Error, { url: string }>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: ({ url }: { url: string }) => submitForm({ url }),
    ...options,
  });
}

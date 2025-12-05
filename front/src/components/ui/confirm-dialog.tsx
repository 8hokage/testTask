import * as React from "react";
import { Modal } from "./modal";
import { Button } from "./button";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  loading
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={!!loading}>
            {cancelText}
          </Button>
          <Button
            onClick={async () => {
              await onConfirm();
              onOpenChange(false);
            }}
            disabled={!!loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}



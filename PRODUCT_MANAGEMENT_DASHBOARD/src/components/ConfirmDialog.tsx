interface ConfirmDialogProps {
    productName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    productName,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-80 rounded-lg bg-white p-5 shadow-lg dark:bg-gray-800">
                <h2 className="mb-3 text-lg font-bold">
                    Delete Product
                </h2>

                <p className="mb-5">
                    Delete "{productName}"?
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="rounded bg-gray-300 px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded bg-red-600 px-4 py-2 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
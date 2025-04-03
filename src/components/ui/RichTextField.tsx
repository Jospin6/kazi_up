import dynamic from "next/dynamic";
import { Label } from "./label";
import { Controller } from "react-hook-form";

const Editor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), {
    ssr: false,
});

interface RichTextFieldProps {
    label: string
    initialValue?: string
    control: any
    name: string 
}

export const RichTextField: React.FC<RichTextFieldProps> = ({ label, control, name, initialValue = "" }) => {
    return <div className="mb-4">
        <Label className="block text-[12px] text-gray-300 mb-1 font-medium">{label.toLocaleUpperCase()}</Label>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Editor
                    apiKey="yhg1lt3xy8nbv42slt60rarcifk8dwhj5hjax3fov0nnpiji"
                    initialValue=""
                    init={{
                        plugins: [
                            "anchor",
                            "autolink",
                            "charmap",
                            "codesample",
                            "emoticons",
                            "lists",
                            "searchreplace",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | bold italic underline strikethrough | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        menubar: "",
                    }}
                    onEditorChange={(content) => field.onChange(content)} // Met à jour React Hook Form
                />
            )}
        />
    </div>
}
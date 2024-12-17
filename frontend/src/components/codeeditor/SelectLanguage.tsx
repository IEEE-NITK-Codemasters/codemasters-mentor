import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { supportedLangs } from "@/lib/constants/supportedLangs";
import { Dispatch , SetStateAction } from "react";

interface Props {
    setLang: Dispatch<SetStateAction<typeof supportedLangs[0]>>;
}

export default function SelectLang({setLang}: Props) {

    function handleChange(value: string) {
        const lang = supportedLangs.find(lang => lang.name === value)
        if(lang) {
            setLang(lang)
        }
    }

    return (
      <Select onValueChange={handleChange} defaultValue={supportedLangs[0].name}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          
            {supportedLangs.map((lang) => (
                <SelectItem key={lang.key} value={lang.name}>
                {lang.name}
                </SelectItem>
            ))}

        </SelectGroup>
      </SelectContent>
    </Select>
    )
}
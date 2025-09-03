import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectFilter({ selectedItem, setSelectedItem, items, placeholder }) {
  return (
    <div className="flex flex-col">
      <Select value={selectedItem} onValueChange={setSelectedItem}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => {
            let key, value, label

            if (typeof item === "string" || typeof item === "number") {
              key = item
              value = item
              label = item
            } else if ("name" in item) {
              key = item.id
              value = item.name
              label = item.name
            } else if ("type" in item) {
              key = item.id
              value = item.type
              label = item.type === "income" ? "Entrada" : "Saída"
            }

            return (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
import { useState } from "react";
import Select from "react-select";
import { useGetPCComponentsByTypeQuery } from "../../store/api/apiPCComponent";

interface ComponentOption {
    value: string;
    label: string;
}

interface PCComponent {
    id: number;
    details?: {
        name: string;
    };
    componentId: number;
}

const componentTypes: ComponentOption[] = [
    { value: "PROCESSOR", label: "Процессор" },
    { value: "VIDEOCARD", label: "Видеокарта" },
    { value: "MOTHERBOARD", label: "Материнская плата" },
    { value: "RAM", label: "Оперативная память" },
    { value: "STORAGE", label: "Накопитель" },
    { value: "COOLER", label: "Кулер" },
    { value: "POWER_SUPPLY", label: "Блок питания" },
];

export default function PCComponentSelector() {
    const [selectedType, setSelectedType] = useState<ComponentOption | null>(null);
    // @ts-ignore
    const { data: components = [], isFetching } = useGetPCComponentsByTypeQuery(selectedType?.value, {
        skip: !selectedType,
    });

    return (
        <div className="form-group">
            <label><strong>Тип комплектующего</strong></label>
            <Select
                options={componentTypes}
                onChange={setSelectedType}
                value={selectedType}
                placeholder="Выберите тип комплектующего"
                isClearable
            />

            {selectedType && (
                <div className="form-group">
                    <label><strong>{selectedType.label}</strong></label>
                    <Select
                        options={components.map((comp: PCComponent) => ({
                            value: comp.id.toString(),
                            label: comp.details?.name ?? `ID: ${comp.componentId}` // Используем componentId, если name отсутствует
                        }))}
                        placeholder={isFetching ? "Загрузка..." : "Выберите комплектующее"}
                        isDisabled={isFetching}
                    />
                </div>
            )}
        </div>
    );
}

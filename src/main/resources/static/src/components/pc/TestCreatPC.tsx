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

export default function PCComponentSelector() {
    const [selectedComponents, setSelectedComponents] = useState<{ [key: string]: PCComponent | null }>({});

    const { data: processors = [], isFetching: loadingProcessors } = useGetPCComponentsByTypeQuery("PROCESSOR");
    const { data: videocards = [], isFetching: loadingVideocards } = useGetPCComponentsByTypeQuery("VIDEOCARD");
    const { data: motherboards = [], isFetching: loadingMotherboards } = useGetPCComponentsByTypeQuery("MOTHERBOARD");
    const { data: ram = [], isFetching: loadingRam } = useGetPCComponentsByTypeQuery("RAM");
    const { data: storage = [], isFetching: loadingStorage } = useGetPCComponentsByTypeQuery("STORAGE");
    const { data: coolers = [], isFetching: loadingCoolers } = useGetPCComponentsByTypeQuery("COOLER");
    const { data: powerSupplies = [], isFetching: loadingPowerSupplies } = useGetPCComponentsByTypeQuery("POWER_SUPPLY");

    return (
        <div className="form-group">

            {/* Процессор */}
            <div className="form-group mb-4">
                <label><strong>Процессор</strong></label>
                <Select
                    options={processors.map(comp => ({
                        value: comp.id.toString(),
                        label: comp.details?.name ?? `ID: ${comp.componentId}`,
                    }))}
                    placeholder={loadingProcessors ? "Загрузка..." : "Выберите процессор"}
                    isDisabled={loadingProcessors}
                    onChange={(selected) =>
                        setSelectedComponents((prev) => ({
                            ...prev,
                            PROCESSOR: selected ? processors.find(c => c.id.toString() === selected.value) ?? null : null
                        }))
                    }
                    value={
                        selectedComponents.PROCESSOR
                            ? {
                                value: selectedComponents.PROCESSOR.id.toString(),
                                label: selectedComponents.PROCESSOR.details?.name ?? `ID: ${selectedComponents.PROCESSOR.componentId}`,
                            }
                            : null
                    }
                    isClearable
                />
            </div>

            {/* Видеокарта */}
            <div className="form-group mb-4">
                <label><strong>Видеокарта</strong></label>
                <Select
                    options={videocards.map(comp => ({
                        value: comp.id.toString(),
                        label: comp.details?.name ?? `ID: ${comp.componentId}`,
                    }))}
                    placeholder={loadingVideocards ? "Загрузка..." : "Выберите видеокарту"}
                    isDisabled={loadingVideocards}
                    onChange={(selected) =>
                        setSelectedComponents((prev) => ({
                            ...prev,
                            VIDEOCARD: selected ? videocards.find(c => c.id.toString() === selected.value) ?? null : null
                        }))
                    }
                    value={
                        selectedComponents.VIDEOCARD
                            ? {
                                value: selectedComponents.VIDEOCARD.id.toString(),
                                label: selectedComponents.VIDEOCARD.details?.name ?? `ID: ${selectedComponents.VIDEOCARD.componentId}`,
                            }
                            : null
                    }
                    isClearable
                />
            </div>

            {/* Материнская плата */}
            <div className="form-group mb-4">
                <label><strong>Материнская плата</strong></label>
                <Select
                    options={motherboards.map(comp => ({
                        value: comp.id.toString(),
                        label: comp.details?.name ?? `ID: ${comp.componentId}`,
                    }))}
                    placeholder={loadingMotherboards ? "Загрузка..." : "Выберите материнскую плату"}
                    isDisabled={loadingMotherboards}
                    onChange={(selected) =>
                        setSelectedComponents((prev) => ({
                            ...prev,
                            MOTHERBOARD: selected ? motherboards.find(c => c.id.toString() === selected.value) ?? null : null
                        }))
                    }
                    value={
                        selectedComponents.MOTHERBOARD
                            ? {
                                value: selectedComponents.MOTHERBOARD.id.toString(),
                                label: selectedComponents.MOTHERBOARD.details?.name ?? `ID: ${selectedComponents.MOTHERBOARD.componentId}`,
                            }
                            : null
                    }
                    isClearable
                />
            </div>

            {/* Оперативная память */}
            <div className="form-group mb-4">
                <label><strong>Оперативная память</strong></label>
                <Select
                    options={ram.map(comp => ({
                        value: comp.id.toString(),
                        label: comp.details?.name ?? `ID: ${comp.componentId}`,
                    }))}
                    placeholder={loadingRam ? "Загрузка..." : "Выберите оперативную память"}
                    isDisabled={loadingRam}
                    onChange={(selected) =>
                        setSelectedComponents((prev) => ({
                            ...prev,
                            RAM: selected ? ram.find(c => c.id.toString() === selected.value) ?? null : null
                        }))
                    }
                    value={
                        selectedComponents.RAM
                            ? {
                                value: selectedComponents.RAM.id.toString(),
                                label: selectedComponents.RAM.details?.name ?? `ID: ${selectedComponents.RAM.componentId}`,
                            }
                            : null
                    }
                    isClearable
                />
            </div>

            {/* Накопитель */}
            <div className="form-group mb-4">
                <label><strong>Накопитель</strong></label>
                <Select
                    options={storage.map(comp => ({
                        value: comp.id.toString(),
                        label: comp.details?.name ?? `ID: ${comp.componentId}`,
                    }))}
                    placeholder={loadingStorage ? "Загрузка..." : "Выберите накопитель"}
                    isDisabled={loadingStorage}
                    onChange={(selected) =>
                        setSelectedComponents((prev) => ({
                            ...prev,
                            STORAGE: selected ? storage.find(c => c.id.toString() === selected.value) ?? null : null
                        }))
                    }
                    value={
                        selectedComponents.STORAGE
                            ? {
                                value: selectedComponents.STORAGE.id.toString(),
                                label: selectedComponents.STORAGE.details?.name ?? `ID: ${selectedComponents.STORAGE.componentId}`,
                            }
                            : null
                    }
                    isClearable
                />
            </div>

            {/* Кулер */}
            <div className="form-group mb-4">
                <label><strong>Кулер</strong></label>
                <Select
                    options={coolers.map(comp => ({
                        value: comp.id.toString(),
                        label: comp.details?.name ?? `ID: ${comp.componentId}`,
                    }))}
                    placeholder={loadingCoolers ? "Загрузка..." : "Выберите кулер"}
                    isDisabled={loadingCoolers}
                    onChange={(selected) =>
                        setSelectedComponents((prev) => ({
                            ...prev,
                            COOLER: selected ? coolers.find(c => c.id.toString() === selected.value) ?? null : null
                        }))
                    }
                    value={
                        selectedComponents.COOLER
                            ? {
                                value: selectedComponents.COOLER.id.toString(),
                                label: selectedComponents.COOLER.details?.name ?? `ID: ${selectedComponents.COOLER.componentId}`,
                            }
                            : null
                    }
                    isClearable
                />
            </div>

            {/* Блок питания */}
            <div className="form-group mb-4">
                <label><strong>Блок питания</strong></label>
                <Select
                    options={powerSupplies.map(comp => ({
                        value: comp.id.toString(),
                        label: comp.details?.name ?? `ID: ${comp.componentId}`,
                    }))}
                    placeholder={loadingPowerSupplies ? "Загрузка..." : "Выберите блок питания"}
                    isDisabled={loadingPowerSupplies}
                    onChange={(selected) =>
                        setSelectedComponents((prev) => ({
                            ...prev,
                            POWER_SUPPLY: selected ? powerSupplies.find(c => c.id.toString() === selected.value) ?? null : null
                        }))
                    }
                    value={
                        selectedComponents.POWER_SUPPLY
                            ? {
                                value: selectedComponents.POWER_SUPPLY.id.toString(),
                                label: selectedComponents.POWER_SUPPLY.details?.name ?? `ID: ${selectedComponents.POWER_SUPPLY.componentId}`,
                            }
                            : null
                    }
                    isClearable
                />
            </div>
        </div>
    );
}

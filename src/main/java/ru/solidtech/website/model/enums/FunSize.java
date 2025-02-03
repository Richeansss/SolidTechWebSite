package ru.solidtech.website.model.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum FunSize {
    SIZE_70x70("70x70"),
    SIZE_80x80("80x80"),
    SIZE_92x92("92x92"),
    SIZE_120x120("120x120"),
    SIZE_140x140("140x140");

    private final String size;

    FunSize(String size) {
        this.size = size;
    }

    public String getSize() {
        return size;
    }

    public static FunSize fromSize(String size) {
        for (FunSize fs : values()) {
            if (fs.size.equals(size)) {
                return fs;
            }
        }
        throw new IllegalArgumentException("Неизвестный размер вентилятора CPU кулера: " + size);
    }

    @Converter(autoApply = true)
    public static class FunSizeConverter implements AttributeConverter<FunSize, String> {
        @Override
        public String convertToDatabaseColumn(FunSize funSize) {
            return funSize != null ? funSize.getSize() : null;
        }

        @Override
        public FunSize convertToEntityAttribute(String size) {
            return size != null ? FunSize.fromSize(size) : null;
        }
    }
}
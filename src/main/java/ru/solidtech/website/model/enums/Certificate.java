package ru.solidtech.website.model.enums;

import lombok.Getter;

@Getter
public enum Certificate {
    NONE("None"),
    SIMPLE_80_PLUS("80 Plus"),
    BRONZE_80_PLUS("80 Plus Bronze"),
    SILVER_80_PLUS("80 Plus Silver"),
    GOLD_80_PLUS("80 Plus Gold"),
    PLATINUM_80_PLUS("80 Plus Platinum"),
    TITANIUM_80_PLUS("80 Plus Titanium");

    private final String displayName;

    Certificate(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
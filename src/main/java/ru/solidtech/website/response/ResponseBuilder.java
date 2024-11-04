package ru.solidtech.website.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseBuilder {

    public static ResponseEntity<Map<String, Object>> buildResponse(HttpStatus status, String description, Object data) {
        Map<String, Object> responseDetails = new LinkedHashMap<>();
        responseDetails.put("code", status.value());
        responseDetails.put("description", description);

        Map<String, Object> finalResponse = new LinkedHashMap<>();
        finalResponse.put("response", responseDetails);
        finalResponse.put("data", data);

        return new ResponseEntity<>(finalResponse, status);
    }

    public static ResponseEntity<Map<String, Object>> buildErrorResponse(HttpStatus status, String errorMessage) {
        Map<String, Object> responseDetails = new LinkedHashMap<>();
        responseDetails.put("code", status.value());
        responseDetails.put("description", errorMessage);

        Map<String, Object> finalResponse = new LinkedHashMap<>();
        finalResponse.put("response", responseDetails);
        finalResponse.put("data", null); // Или можно не включать поле data, если оно не требуется

        return new ResponseEntity<>(finalResponse, status);
    }
}

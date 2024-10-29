package com.example.technogamesbackend;

import com.example.technogamesbackend.models.TestData;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Paths;

@Service
public class DataService {

    public TestData getTestData() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(Paths.get("src/main/resources/test-data.json").toFile(), TestData.class);
    }
}

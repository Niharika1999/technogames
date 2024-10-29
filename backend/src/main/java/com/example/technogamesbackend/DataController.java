package com.example.technogamesbackend;

import com.example.technogamesbackend.models.TestData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;

@RestController
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/api/data")
    public TestData getData() throws IOException {
        return dataService.getTestData();
    }

    @GetMapping("/api/health")
    public String healthCheck() {
        return "Backend is running!";
    }

}

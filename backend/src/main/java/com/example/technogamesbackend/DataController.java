package com.example.technogamesbackend;

import com.example.technogamesbackend.models.TestData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.io.IOException;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/data")
    public TestData getData() throws IOException {
        return dataService.getTestData();
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Backend is running!";
    }

}

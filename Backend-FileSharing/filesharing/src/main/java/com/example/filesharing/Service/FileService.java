package com.example.filesharing.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class FileService {

    private static final String UPLOAD_DIR = "uploads/";

    public void uploadFile(MultipartFile file) throws IOException {
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
    }

    public List<String> listFiles() {
        List<String> fileNames = new ArrayList<>();
        File uploadDir = new File(UPLOAD_DIR);
        if (uploadDir.exists() && uploadDir.isDirectory()) {
            for (File file : Objects.requireNonNull(uploadDir.listFiles())) {
                fileNames.add(file.getName());
            }
        }
        return fileNames;
    }
}

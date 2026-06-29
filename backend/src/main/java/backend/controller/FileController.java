package backend.controller;
import java.io.File;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class FileController {

    private final String UPLOAD_DIR = "uploads/";

    @RequestMapping(
            value = "/upload",
            method = RequestMethod.OPTIONS
    )
    public ResponseEntity<?> options() {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload")
public String uploadFile(
        @RequestParam("file")
        MultipartFile file
) throws IOException {

    String uploadDir =
            System.getProperty("user.dir")
            + "/uploads/";

    File folder =
            new File(uploadDir);

    if (!folder.exists()) {
        folder.mkdirs();
    }

    String fileName =
            file.getOriginalFilename();

    File destination =
            new File(
                    uploadDir + fileName
            );

    file.transferTo(destination);

    return fileName;
}
}
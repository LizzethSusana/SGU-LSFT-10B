package mx.edu.utez.server.modules.users;

import mx.edu.utez.server.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sgu-api/user")
@CrossOrigin(origins = "*")

public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<ApiResponse> findAll() {
        ApiResponse response = userService.findAll();
        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> findById(@PathVariable("id") Long id){
        ApiResponse response = userService.findById(id);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse> save(@RequestBody BeanUser payload){
        ApiResponse response = userService.save(payload);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PutMapping("")
    public ResponseEntity<ApiResponse> update(@RequestBody BeanUser payload){
        ApiResponse response = userService.update(payload);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @DeleteMapping("")
    public ResponseEntity<ApiResponse> remove(@RequestBody BeanUser payload){
        ApiResponse response = userService.remove(payload);
        return new ResponseEntity<>(response, response.getStatus());
    }

}
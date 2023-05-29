package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/rest/admin")
public class AdminRestController {

    @Autowired
    private UserServiceImpl userServiceImpl;
    @GetMapping
    public ResponseEntity<List<User>> read(Model model, Principal principal) {
        final List<User> users = userServiceImpl.findAll();
        model.addAttribute("users", users);
        model.addAttribute("currentUser", userServiceImpl.findByUsername(principal.getName()));
        return users != null &&  !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/create")
    public Long createUser(@RequestBody User user) {
        userServiceImpl.saveUser(user);
        return user.getId();
    }

    @DeleteMapping(value="/delete/{id}")
    public void removeUser(@PathVariable(value = "id") long id) {
        userServiceImpl.deleteById(id);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<?> editUser(@RequestBody User user, @PathVariable Long id) {
        user.setId(id);
        userServiceImpl.editUser(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

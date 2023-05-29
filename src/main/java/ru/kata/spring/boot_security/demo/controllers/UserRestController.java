package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;
import ru.kata.spring.boot_security.demo.models.User;

import java.security.Principal;

@RestController
@RequestMapping("/rest/user")
public class UserRestController {
    @Autowired
    UserServiceImpl userServiceImpl;

    @GetMapping
    public ResponseEntity<User> userPage(Principal principal, ModelMap modelMap) {
        User user = userServiceImpl.findByUsername(principal.getName());
        modelMap.addAttribute("user", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

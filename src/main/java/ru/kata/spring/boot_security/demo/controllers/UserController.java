package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;
import ru.kata.spring.boot_security.demo.models.User;

import java.security.Principal;
import java.util.stream.Collectors;

@RestController
public class UserController {
    @Autowired
    UserServiceImpl userServiceImpl;

    @GetMapping("/user")
    public String userPage(Principal principal, ModelMap modelMap) {
        User user = userServiceImpl.findByUsername(principal.getName());
        modelMap.addAttribute("user", user);
        modelMap.addAttribute("roles", user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        return "/user";
    }
}

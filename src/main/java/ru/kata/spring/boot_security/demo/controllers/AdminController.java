package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.RoleEnum;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserServiceImpl userServiceImpl;
    @GetMapping
    public String getAdminPage(Principal principal, ModelMap modelMap) {
        User user = userServiceImpl.findByUsername(principal.getName());
        modelMap.addAttribute("currentUser", user);
        modelMap.addAttribute("roles", user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        modelMap.addAttribute("users", userServiceImpl.findAll());
        return "admin";
    }

    @PostMapping("/create")
    public String createUser(User user, RoleEnum roleEnum, ModelMap modelMap) {
        Set<Role> role = new HashSet<>();
        role.add(new Role(roleEnum));
        if(roleEnum != RoleEnum.ROLE_USER) {
            role.add(new Role(RoleEnum.ROLE_USER));
        }
        user.setRoles(role);
        userServiceImpl.saveUser(user);
        modelMap.addAttribute("users", userServiceImpl.findAll());
        return "redirect:/admin";
    }
}
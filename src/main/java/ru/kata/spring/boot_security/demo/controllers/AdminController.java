package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.RoleEnum;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserServiceImpl userServiceImpl;
    @GetMapping
    public String getAdminPage() {
        return "admin";
    }

    @GetMapping("/userList")
    public String getUserList(ModelMap modelMap) {
        modelMap.addAttribute("users", userServiceImpl.findAll());
        return "userList";
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
        return "userList";
    }

    @GetMapping(value="/delete/{id}")
    public String removeUser(@PathVariable(value = "id") long id) {
        userServiceImpl.deleteById(id);
        return "redirect:/admin/userList";
    }

    @GetMapping(value = "/edit/{id}")
    public String showEditForm(@PathVariable("id") long id, Model model) {
        model.addAttribute("user", userServiceImpl.getById(id));
        return "edit";
    }

    @PostMapping(value = "/edit/{id}")
    public String editUser(RoleEnum roleEnum, User user) {
        Set<Role> role = new HashSet<>();
        role.add(new Role(roleEnum));
        if(roleEnum != RoleEnum.ROLE_USER) {
            role.add(new Role(RoleEnum.ROLE_USER));
        }
        user.setRoles(role);
        userServiceImpl.editUser(user);
        return "edit";
    }
}

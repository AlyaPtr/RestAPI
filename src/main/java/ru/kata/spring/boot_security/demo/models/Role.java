package ru.kata.spring.boot_security.demo.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "Roles")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private RoleEnum name;
    @Column(name = "name")
    @Enumerated
    public RoleEnum getRole() {
        return name;
    }

    public void setName(RoleEnum name) {
        this.name = name;
    }

    public Role() {}
    @JsonCreator
    public Role(RoleEnum name) {
        this.name = name;
    }

    public RoleEnum getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getAuthority() {
        return getName().name();
    }
}

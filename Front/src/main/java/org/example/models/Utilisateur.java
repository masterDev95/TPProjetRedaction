package org.example.models;

import java.util.ArrayList;
import java.util.List;

public class Utilisateur {
    private int id;
    private String nom;
    private String prenom;
    private List<Livre> livresEmpruntes;
    private List<Livre> livresReserves;

    public Utilisateur(int id, String nom, String prenom) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.livresEmpruntes = new ArrayList<>();
        this.livresReserves = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public List<Livre> getLivresEmpruntes() {
        return livresEmpruntes;
    }

    public List<Livre> getLivresReserves() {
        return livresReserves;
    }

    public void emprunterLivre(Livre livre) {
        // Ajouter le livre à la liste des livres empruntés
        getLivresEmpruntes().add(livre);
    }

    public void rendreLivre(Livre livre) {
        // Retirer le livre de la liste des livres empruntés
        getLivresEmpruntes().remove(livre);
    }

    public void reserverLivre(Livre livre) {
        // Vérifier si l'utilisateur n'a pas déjà emprunté le livre
        // Si oui, ajouter le livre à la liste des livres réservés, marquer le livre comme réservé par l'utilisateur
        if (!getLivresEmpruntes().contains(livre)) {
            getLivresReserves().add(livre);
            livre.setReservePar(this);
        }
    }
}

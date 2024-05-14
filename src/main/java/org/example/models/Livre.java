package org.example.models;

public class Livre {
    private int id;
    private String titre;
    private String auteur;
    private String isbn;
    private int annee;
    private Utilisateur reservePar;

    public Livre(int id, String titre, String auteur, String isbn, int annee, Utilisateur reservePar) {
        this.id = id;
        this.titre = titre;
        this.auteur = auteur;
        this.isbn = isbn;
        this.annee = annee;
        this.reservePar = reservePar;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public Utilisateur getReservePar() {
        return reservePar;
    }

    public void setReservePar(Utilisateur utilisateur) {
        this.reservePar = utilisateur;
    }
}

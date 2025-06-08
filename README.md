# Adventscrap

Extrait automatiquement des chants (Hymnes et Louanges, JEM, JEM Kids, DLG, ATG) et les formate dans un fichier texte compatible ProPresenter, prêt à l’import. Idéal pour faciliter la projection de chants lors de vos événements.

--- 

## Prérequis

- Node >= v22.14.0

---

## Fonctionnalités principales

- Extraction automatique de chants à partir de plusieurs répertoires ou sites (Hymnes et Louanges, JEM, JEM Kids, DLG, ATG).
- Mise en forme des paroles dans un fichier `.txt` structuré selon les exigences de ProPresenter.
- Prêt à l’import dans ProPresenter pour une utilisation immédiate.

---

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/rzjosia/adventscrap.git
cd adventscrap
```

### Installer les dépendances

```bash
npm install
```

## Utilisation

### Lancer le script

```bash
npm start
```

### Récupérer le fichier généré

- Le script génère un fichier `.txt` prêt à être importé dans ProPresenter.
- Le fichier se trouve dans le dossier de sortie spécifié (par défaut : `output`).

---

## Format du fichier généré
Le fichier texte suit la structure recommandée par ProPresenter pour une importation simple. Chaque slide est séparé par une ligne vide, et les couplets/refrains sont clairement identifiés.

Exemple :

```txt
Title: Je veux chanter - DLG 001

[Introduction]
Je veux chanter - DLG 001

[Couplet 1]
Je veux chanter l'amour puissant
Qui sauve et qui délivre,

Qui remplit mon coeur maintenant
De joie et me fait vivre.

[Refrain]
Je veux chanter,
Chanter de tout mon coeur

L'amour de Dieu,
L'amour de mon Sauveur.

[Couplet 2]
Je veux chanter l'amour vainqueur,
Qui, malgré ma faiblesse,

Peut me donner, à moi, pécheur,
La victoire sans cesse.

[Couplet 3]
Je veux chanter le tendre amour,
Qui dans les jours de peine

Rends le poids du chagrin moins lourd,
Console et rassérène.

[Couplet 4]
Je veux chanter le grand amour,
Immuable et fidèle,

Qui me conduit de jour en jour
Vers la vie éternelle.

[Conclusion]
```
---

## Compatibilité

- *ProPresenter* : Importation directe du fichier `.txt` via la fonction d’import de ProPresenter.
- *Sources supportées* : Hymnes et Louanges, JEM, JEM Kids, DLG, ATG (ajoutez ou modifiez les sources selon vos besoins).

---

## Licence

Ce projet est sous licence MIT.

Vous pouvez l’utiliser, le modifier et le redistribuer librement.

---

*Bon usage et que vos projections soient fluides !*

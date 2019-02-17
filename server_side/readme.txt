Le programme se lance depuis le fichier principal : relaischateaux.js.
Les nombreux page.waitFor servent à s'assurer que la page est bien chargée pour que les différentes actions
de scraping ne plantent pas mais malheureusement cet aspect de puppeteer n'est pas très au point donc 
même avec les marges prévues dans ce programme il n'est pas sur qu'il fasse correctement son travail...
Le scrapping est vraiment très long mais à priori le programme réussi à récupérer facilement tous les restaurants étoilés
du guide michelin par contre parcourir Relais&Châteaux est très laborieux pour l'émulateur de Chromium de puppeteer.
J'avais prévu un module pour comparer les pourcentages de similarité entre les noms des restaurants tels qu'ils sont donnés
par Relais&Châteaux et ceux donnés par le guide michelin afin d'accepter qu'ils sont similaires au-dessus d'un seuil de 75%
mais je n'ai pas eu le temps de mettre cela en place dans cette version "finale" du projet castle.

Le logiciel ne fournit les informaions qu'entre deux dates que l'on peut changer via les variables debut et fin au début du fichier index.js
du module castle.

Le programme se lance depuis le fichier principal : relaischateaux.js.
Les nombreux page.waitFor servent � s'assurer que la page est bien charg�e pour que les diff�rentes actions
de scraping ne plantent pas mais malheureusement cet aspect de puppeteer n'est pas tr�s au point donc 
m�me avec les marges pr�vues dans ce programme il n'est pas sur qu'il fasse correctement son travail...
Le scrapping est vraiment tr�s long mais � priori le programme r�ussi � r�cup�rer facilement tous les restaurants �toil�s
du guide michelin par contre parcourir Relais&Ch�teaux est tr�s laborieux pour l'�mulateur de Chromium de puppeteer.
J'avais pr�vu un module pour comparer les pourcentages de similarit� entre les noms des restaurants tels qu'ils sont donn�s
par Relais&Ch�teaux et ceux donn�s par le guide michelin afin d'accepter qu'ils sont similaires au-dessus d'un seuil de 75%
mais je n'ai pas eu le temps de mettre cela en place dans cette version "finale" du projet castle.

Le logiciel ne fournit les informaions qu'entre deux dates que l'on peut changer via les variables debut et fin au d�but du fichier index.js
du module castle.

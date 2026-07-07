import { useState, useEffect, useCallback } from 'react';

const MENU_KEY = 'portavia_menu_v6';
const ORDERS_KEY = 'portavia_orders_v4';

const defaultMenu = [
  {
    "title": "Başlangıçlar",
    "items": [
      {
        "id": "B-1",
        "name": "Palline di Ricotta al Limone",
        "desc": "Ricotta peyniri, Hindistan cevizi, limon kabuğu ve acı bal ile üç adet olarak servis edilir. / Three ricotta bites with coconut, lemon zest and hot honey. (440 kcal / porsiyon)",
        "price": "₺230",
        "image": ""
      },
      {
        "id": "B-2",
        "name": "Patate Rubino",
        "desc": "Fırınlanmış çıtır baby patates, pancar kreması, Parmesan peyniri, taze kekik ve kurutulmuş acı biber. / Crispy roasted baby potatoes with beetroot cream, Parmesan, fresh thyme and dried chili. (600 kcal / porsiyon)",
        "price": "₺280",
        "image": ""
      },
      {
        "id": "B-3",
        "name": "Roast Beef al Balsamico",
        "desc": "İnce dilimlenmiş dana roast beef, Parmesan dilimleri, zeytinyağı ve üzüm pekmezli balzamik sos; taze roka ile servis edilir. / Thinly sliced roast beef with Parmesan, olive oil and grape-molasses balsamic sauce, served with fresh rocket. (750 kcal / porsiyon)",
        "price": "₺410",
        "image": ""
      }
    ]
  },
  {
    "title": "Ana Yemekler",
    "items": [
      {
        "id": "AY-1",
        "name": "PIENZA",
        "desc": "Jumbo karides, krema, limon kabuğu, taze biberiye, zeytinyağı ve taze çekilmiş karabiber. / Jumbo shrimp, cream, lemon zest, fresh rosemary, olive oil and freshly ground black pepper. (740 kcal)",
        "price": "₺610",
        "image": ""
      },
      {
        "id": "AY-2",
        "name": "POLLO PICCATA",
        "desc": "Tereyağında pişirilmiş marine tavuk, parmesan kreması, kapari, limon suyu, limon kabuğu ve taze fesleğen. / Butter-cooked marinated chicken, Parmesan cream, capers, lemon juice, lemon zest and fresh basil. (900 kcal)",
        "price": "₺620",
        "image": ""
      },
      {
        "id": "AY-3",
        "name": "POLLO PARMIGIANA",
        "desc": "Tereyağında pişirilmiş marine tavuk, San Marzano domates sosu, kurutulmuş acı biber, taze kekik ve rendelenmiş Parmesan peyniri. / Butter-cooked marinated chicken, San Marzano tomato sauce, dried chili, fresh thyme and grated Parmesan. (980 kcal)",
        "price": "₺640",
        "image": ""
      },
      {
        "id": "AY-4",
        "name": "POLLO MIMOSA",
        "desc": "Tereyağında pişirilmiş marine tavuk, pesto sos, krema, kuş üzümü ve kavrulmuş çam fıstığı. / Butter-cooked marinated chicken, pesto sauce, cream, currants and toasted pine nuts. (1250 kcal)",
        "price": "₺660",
        "image": ""
      },
      {
        "id": "AY-5",
        "name": "FRUTTI DI MARE",
        "desc": "Marine ahtapot, marine jumbo karides, mor soğan, közlenmiş patlıcan, sarımsak, portakal kabuğu ve krema. / Marinated octopus and jumbo shrimp, red onion, roasted eggplant, garlic, orange zest and cream. (770 kcal)",
        "price": "₺710",
        "image": ""
      },
      {
        "id": "AY-6",
        "name": "MANZO CON CILIEGIE",
        "desc": "Tereyağında mühürlenmiş dana bonfile, vişne, taze kekik ve havuç kreması. / Butter-seared beef tenderloin, sour cherries, fresh thyme and carrot cream. (800 kcal)",
        "price": "₺950",
        "image": ""
      },
      {
        "id": "AY-7",
        "name": "FILETTO AL CAFFÈ",
        "desc": "Tereyağlı dana bonfile, espresso, mor soğan, taze biberiye, tane karabiber ve pancar kreması. / Butter-cooked beef tenderloin, espresso, red onion, fresh rosemary, black peppercorns and beetroot cream. (800 kcal)",
        "price": "₺950",
        "image": ""
      }
    ]
  },
  {
    "title": "Burgerler",
    "items": [
      {
        "id": "BG-1",
        "name": "BURGER APHO VERDE",
        "desc": "Dana burger köftesi (120 g), cherry domates, taze roka, Parmesan peyniri ve pesto sos. Elma dilim patates ile servis edilir. / Beef burger patty (120 g), cherry tomatoes, fresh arugula, Parmesan cheese and pesto sauce. Served with apple wedge potatoes. (910 kcal / porsiyon)",
        "price": "₺520",
        "image": ""
      },
      {
        "id": "BG-2",
        "name": "BLACK BURGER",
        "desc": "Siyah burger ekmeği, 120 g dana burger köftesi, füme kaburga, kremalı istiridye mantarı ve ızgara ananas. Elma dilim patates ile servis edilir. / Black burger bun, 120 g beef burger patty, smoked brisket, creamy oyster mushrooms and grilled pineapple. Served with apple wedge potatoes. (1040 kcal / porsiyon)",
        "price": "₺610",
        "image": ""
      }
    ]
  },
  {
    "title": "Pizzalar",
    "items": [
      {
        "id": "PZ-1",
        "name": "MARGHERITA",
        "desc": "Domates sosu, mozzarella peyniri, cherry domates ve fesleğen yağı. / Tomato sauce, mozzarella cheese, cherry tomatoes and basil oil. (820 kcal)",
        "price": "₺450",
        "image": "/images/margherita.png"
      },
      {
        "id": "PZ-2",
        "name": "POLLO",
        "desc": "Domates sosu, mozzarella, marine tavuk, köz patlıcan, mor soğan, kestane mantarı, taze kekik ve zeytinyağı. / Tomato sauce, mozzarella, marinated chicken, roasted eggplant, red onion, chestnut mushrooms, fresh thyme and olive oil. (960 kcal)",
        "price": "₺540",
        "image": "/images/pollo.png"
      },
      {
        "id": "PZ-3",
        "name": "ANATOLIA",
        "desc": "Domates sosu, mozzarella, dana sucuk, siyah zeytin, közlenmiş biber ve istiridye mantarı. / Domates sosu, mozzarella, beef sausage, black olives, roasted peppers and oyster mushrooms. (1100 kcal)",
        "price": "₺560",
        "image": "/images/anatolia.png"
      },
      {
        "id": "PZ-4",
        "name": "QUATTRO FORMAGGI",
        "desc": "Domates sosu, mozzarella, gorgonzola, parmesan ve ricotta peynirleri. / Tomato sauce, mozzarella, gorgonzola, Parmesan and ricotta cheeses. (970 kcal)",
        "price": "₺580",
        "image": "/images/quattro-formaggi.png"
      },
      {
        "id": "PZ-5",
        "name": "PESCA",
        "desc": "Domates sosu, mozzarella, gorgonzola, sotelenmiş şeftali, karanfil aroması, portakal kabuğu ve acı yağ. / Tomato sauce, mozzarella, gorgonzola, sautéed peach, clove aroma, orange zest and chili oil. (920 kcal)",
        "price": "₺580",
        "image": ""
      },
      {
        "id": "PZ-6",
        "name": "FRUTTI DI MARE",
        "desc": "Domates sosu, mozzarella, marine jumbo karides, marine baby ahtapot, fesleğen yağı ve limon kabuğu. / Tomato sauce, mozzarella, marinated jumbo shrimp, baby octopus, basil oil and lemon zest. (980 kcal)",
        "price": "₺640",
        "image": "/images/frutti-di-mare.png"
      },
      {
        "id": "PZ-7",
        "name": "ITALIANA",
        "desc": "Domates sosu, mozzarella, dana roast beef, közlenmiş patlıcan, ricotta ve pesto sos. / Tomato sauce, mozzarella, roast beef, roasted eggplant, ricotta and pesto sauce. (1030 kcal)",
        "price": "₺660",
        "image": "/images/italiana.png"
      },
      {
        "id": "PZ-8",
        "name": "NOTTE",
        "desc": "Domates sosu, mozzarella, toz espresso, dana tiftik, karamelize soğan, portakal kabuğu ve limon yağı. / Tomato sauce, mozzarella, espresso powder, pulled beef, caramelized onion, orange zest and lemon oil. (1000 kcal)",
        "price": "₺670",
        "image": ""
      },
      {
        "id": "PZ-9",
        "name": "FOLIGNO",
        "desc": "Domates sosu, mozzarella, dana füme kaburga, roka, parmesan ve zeytinyağı. / Tomato sauce, mozzarella, smoked beef rib, arugula, Parmesan and olive oil. (1170 kcal)",
        "price": "₺680",
        "image": "/images/folingo.png"
      },
      {
        "id": "PZ-10",
        "name": "TARTUFO BIANCO",
        "desc": "Parmesan kreması, mozzarella, istiridye mantarı, taze kekik, trüf yağı ve trüf püresi. / Parmesan cream, mozzarella, oyster mushrooms, fresh thyme, truffle oil and truffle purée. (1030 kcal)",
        "price": "₺990",
        "image": "/images/tartufo-bianco.png"
      },
      {
        "id": "PZ-11",
        "name": "LUNA ROSSA",
        "desc": "Domates sosu, mozzarella, burrata, vişne, kavrulmuş ceviz, fesleğen yağı, limon kabuğu ve acı bal. / Tomato sauce, mozzarella, burrata, sour cherries, roasted walnuts, basil oil, lemon zest and hot honey. (1300 kcal)",
        "price": "₺1.250",
        "image": "/images/luna-rossa.png"
      },
      {
        "id": "PZ-12",
        "name": "TARTUFO",
        "desc": "Domates sosu, mozzarella, trüflü mantar, karamelize soğan, kavrulmuş badem, parmesan ve limon yağı. / Domates sosu, mozzarella, truffled mushrooms, caramelized onion, roasted almonds, Parmesan and lemon oil. (950 kcal)",
        "price": "₺5.500",
        "image": ""
      }
    ]
  },
  {
    "title": "Makarnalar",
    "items": [
      {
        "id": "MK-1",
        "name": "SPAGHETTI ALLA PERA",
        "desc": "Tereyağı, karanfil, armut, limon suyu, limon kabuğu, acı bal, rendelenmiş Parmesan peyniri ve taze çekilmiş karabiber. / Butter, clove, pear, lemon juice and zest, hot honey, grated Parmesan and freshly ground black pepper. (630 kcal / porsiyon)",
        "price": "₺510",
        "image": ""
      },
      {
        "id": "MK-2",
        "name": "FETTUCCINE ALFREDO",
        "desc": "Parmesan kreması, tereyağı, marine tavuk, taze kekik ve limon kabuğu. / Parmesan cream, butter, marinated chicken, fresh thyme and lemon zest. (950 kcal / porsiyon)",
        "price": "₺520",
        "image": ""
      },
      {
        "id": "MK-3",
        "name": "FETTUCCINE GAMBERI",
        "desc": "Jumbo karides, krema, fesleğen yağı, limon suyu ve taze çekilmiş karabiber. / Jumbo shrimp, cream, basil oil, lemon juice and freshly ground black pepper. (800 kcal / porsiyon)",
        "price": "₺550",
        "image": ""
      },
      {
        "id": "MK-4",
        "name": "LINGUINE AL LIMONE",
        "desc": "Parmesan kreması, tereyağı, kavrulmuş badem, taze fesleğen ve limon kabuğu. / Parmesan cream, butter, toasted almonds, fresh basil and lemon zest. (850 kcal / porsiyon)",
        "price": "₺550",
        "image": ""
      },
      {
        "id": "MK-5",
        "name": "TAGLIATELLE BOSCO",
        "desc": "Armut, kavrulmuş ceviz, taze kekik, krema, acı bal ve taze çekilmiş karabiber. / Pear, toasted walnuts, fresh thyme, cream, hot honey and freshly ground black pepper. (750 kcal / porsiyon)",
        "price": "₺560",
        "image": ""
      },
      {
        "id": "MK-6",
        "name": "SPAGETTI CARBONARA",
        "desc": "Yumurta sarısı, dana roast beef, Parmesan peyniri ve taze çekilmiş karabiber. / Egg yolk, roast beef, Parmesan cheese and freshly ground black pepper. (630 kcal / porsiyon)",
        "price": "₺570",
        "image": ""
      },
      {
        "id": "MK-7",
        "name": "RIGATONI ALL'AMARENA",
        "desc": "Krema, karamelize soğan, Gorgonzola peyniri, vişne ve taze çekilmiş karabiber. / Cream, caramelized onion, Gorgonzola, sour cherry and freshly ground black pepper. (730 kcal / porsiyon)",
        "price": "₺580",
        "image": ""
      },
      {
        "id": "MK-8",
        "name": "RAVIOLI AL ROSMARINO",
        "desc": "Peynir dolgulu taze ravioli, istiridye mantarı, krema, taze biberiye ve vişne. / Fresh cheese-filled ravioli, oyster mushrooms, cream, fresh rosemary and sour cherry. (890 kcal / porsiyon)",
        "price": "₺610",
        "image": ""
      },
      {
        "id": "MK-9",
        "name": "TORTELLINI DELLA CASA",
        "desc": "Peynir dolgulu taze tortellini, kestane mantarı, krema, limon yağı ve kavrulmuş ceviz. / Fresh cheese-filled tortellini, chestnut mushrooms, cream, lemon oil and toasted walnuts. (1000 kcal / porsiyon)",
        "price": "₺620",
        "image": ""
      },
      {
        "id": "MK-10",
        "name": "AGNOLOTTI ALLA ZUCCA",
        "desc": "Bal kabağı, mozzarella ve ricotta dolgulu taze agnolotti; tereyağı, çıtır adaçayı ve fesleğen yağı ile servis edilir. / Fresh agnolotti filled with pumpkin, mozzarella and ricotta; served with butter, crispy sage and basil oil. (790 kcal / porsiyon)",
        "price": "₺670",
        "image": ""
      },
      {
        "id": "MK-11",
        "name": "RAVIOLI DI MANZO",
        "desc": "Dana eti dolgulu taze ravioli, San Marzano domates sosu, sarımsak, kurutulmuş acı biber, taze kekik ve zeytinyağı. / Fresh beef-filled ravioli with San Marzano tomato sauce, garlic, dried chili, fresh thyme and olive oil. (600 kcal / porsiyon)",
        "price": "₺690",
        "image": ""
      },
      {
        "id": "MK-12",
        "name": "LINGUINE DI MARE",
        "desc": "Marine baby ahtapot, marine jumbo karides, San Marzano domatesi, yeşil zeytin, taze kekik, sarımsak ve zeytinyağı. / Marinated baby octopus and jumbo shrimp, San Marzano tomato, green olives, fresh thyme, garlic and olive oil. (670 kcal / porsiyon)",
        "price": "₺690",
        "image": ""
      },
      {
        "id": "MK-13",
        "name": "FETTUCCINE ARANCIO NERO",
        "desc": "Trüf mantarı püresiyle yoğrulmuş taze fettuccine, krema, trüf mantarı ve taze portakal kabuğu. / Fresh fettuccine infused with truffle purée, cream, truffle and fresh orange zest. (600 kcal / porsiyon)",
        "price": "₺5.100",
        "image": ""
      }
    ]
  },
  {
    "title": "Salatalar",
    "items": [
      {
        "id": "SL-1",
        "name": "Insalata al Caffè",
        "desc": "Suda mozzarella, taze roka, limon kabuğu, espresso-bal sosu ve ince öğütülmüş espresso. / Suda mozzarella, fresh rocket, lemon zest, espresso-honey sauce and finely ground espresso. (460 kcal / porsiyon)",
        "price": "₺490",
        "image": ""
      },
      {
        "id": "SL-2",
        "name": "Insalata alla Pesca",
        "desc": "Izgara şeftali, taze roka, ricotta peyniri, ceviz içi, taze kekik, portakal kabuğu ve fesleğen yağı. / Izgara şeftali, taze roka, ricotta peyniri, ceviz içi, taze kekik, portakal kabuğu ve fesleğen yağı. (520 kcal / porsiyon)",
        "price": "₺520",
        "image": ""
      },
      {
        "id": "SL-3",
        "name": "Insalata all'Amarena",
        "desc": "Vişne, suda mozzarella, taze roka, rendelenmiş Parmesan peyniri, acı bal ve kavrulmuş badem. (620 kcal / porsiyon)",
        "price": "₺560",
        "image": ""
      },
      {
        "id": "SL-4",
        "name": "Insalata Roast Beef",
        "desc": "Dana roast beef, taze fesleğen, limon yağı, rendelenmiş pancar, rendelenmiş mor lahana ve kavrulmuş çam fıstığı. / Dana roast beef, taze fesleğen, limon yağı, rendelenmiş pancar, rendelenmiş mor lahana ve kavrulmuş çam fıstığı. (560 kcal / porsiyon)",
        "price": "₺580",
        "image": ""
      },
      {
        "id": "SL-5",
        "name": "Insalata Tartufo",
        "desc": "Roka, taze kekik, limonlu ricotta peyniri, trüf püresi, ceviz içi, trüf yağı. / Roka, taze kekik, limonlu ricotta peyniri, trüf püresi, ceviz içi, trüf yağı. (390 kcal / porsiyon)",
        "price": "₺710",
        "image": ""
      },
      {
        "id": "SL-6",
        "name": "Burrata e Pera",
        "desc": "Burrata peyniri, ızgara armut, rendelenmiş pancar, mor lahana, taze roka, kavrulmuş çam fıstığı ve fesleğen yağı. (720 kcal / porsiyon)",
        "price": "₺810",
        "image": ""
      }
    ]
  },
  {
    "title": "Tatlılar",
    "items": [
      {
        "id": "TL-1",
        "name": "Lemon Posset",
        "desc": "Limon kreması. / Lemon cream. (320 kcal / portion)",
        "price": "₺120",
        "image": ""
      },
      {
        "id": "TL-2",
        "name": "Panna Cotta",
        "desc": "Vanilyalı panna cotta, orman meyveleri sosu. / Vanilla panna cotta with mixed berries sauce. (430 kcal / portion)",
        "price": "₺310",
        "image": ""
      },
      {
        "id": "TL-3",
        "name": "Çikolatalı Sufle",
        "desc": "Sıcak çikolatalı sufle. / Warm chocolate soufflé. (520 kcal / portion)",
        "price": "₺280",
        "image": ""
      },
      {
        "id": "TL-4",
        "name": "Tiramisu",
        "desc": "Kahveye batırılmış kedi dili, mascarpone kreması, kakao. / Ladyfingers soaked in coffee, mascarpone cream, cocoa. (560 kcal / portion)",
        "price": "₺390",
        "image": ""
      },
      {
        "id": "TL-5",
        "name": "Marlenka",
        "desc": "Ballı ince katmanlar ve krema, ceviz ile. / Honey layered cake with cream and walnuts. (640 kcal / portion)",
        "price": "₺410",
        "image": ""
      },
      {
        "id": "TL-6",
        "name": "San Sebastian",
        "desc": "Karamelize edilmiş dış yüzeyli, yumuşak cheesecake. / Basque-style burnt cheesecake with a creamy center. (680 kcal / portion)",
        "price": "₺420",
        "image": ""
      }
    ]
  },
  {
    "title": "İçecekler",
    "items": [
      {
        "id": "IC-1",
        "name": "Su (0.5) Pet Şişe",
        "desc": "Water (0.5) Pet Bottle",
        "price": "₺50",
        "image": ""
      },
      {
        "id": "IC-2",
        "name": "Beypazarı Sade Soda",
        "desc": "Beypazarı Plain Soda",
        "price": "₺65",
        "image": ""
      },
      {
        "id": "IC-3",
        "name": "Özehirsar Ayran Cam Şişe",
        "desc": "Özehirsar Ayran Glass Bottle",
        "price": "₺75",
        "image": ""
      },
      {
        "id": "IC-4",
        "name": "Su (0.33) Cam Şişe",
        "desc": "Water (0.33) Glass Bottle",
        "price": "₺75",
        "image": ""
      },
      {
        "id": "IC-5",
        "name": "Doğal Limonata",
        "desc": "Natural Lemonade (Yeni)",
        "price": "₺120",
        "image": ""
      },
      {
        "id": "IC-6",
        "name": "Pepsi Cam Şişe",
        "desc": "Pepsi Glass Bottle",
        "price": "₺100",
        "image": ""
      },
      {
        "id": "IC-7",
        "name": "Pepsi Max Cam Şişe",
        "desc": "Pepsi Max Glass Bottle",
        "price": "₺100",
        "image": ""
      },
      {
        "id": "IC-8",
        "name": "Yedigün Portakal Cam Şişe",
        "desc": "Yedigün Orange Glass Bottle",
        "price": "₺100",
        "image": ""
      },
      {
        "id": "IC-9",
        "name": "Lipton Icetea Şeftali Kutu",
        "desc": "Lipton Ice Tea Peach Can",
        "price": "₺100",
        "image": ""
      },
      {
        "id": "IC-10",
        "name": "Lipton Icetea Limon Kutu",
        "desc": "Lipton Ice Tea Lemon Can",
        "price": "₺100",
        "image": ""
      },
      {
        "id": "IC-11",
        "name": "Lipton Icetea Mango Kutu",
        "desc": "Lipton Ice Tea Mango Can",
        "price": "₺100",
        "image": ""
      },
      {
        "id": "IC-12",
        "name": "Beyoğlu Gazoz Cam Şişe",
        "desc": "Beyoğlu Gazoz Glass Bottle",
        "price": "₺110",
        "image": ""
      },
      {
        "id": "IC-13",
        "name": "Pellegrino Minarelli Su (25cl)",
        "desc": "San Pellegrino Water (25cl)",
        "price": "₺220",
        "image": ""
      },
      {
        "id": "IC-14",
        "name": "Pellegrino Minarelli Su (75cl)",
        "desc": "San Pellegrino Water (75cl)",
        "price": "₺360",
        "image": ""
      }
    ]
  },
  {
    "title": "Sıcak Kahveler",
    "items": [
      {
        "id": "SK-1",
        "name": "Coffee Latte",
        "desc": "Caffe Latte",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺190)",
              "Büyük (₺210)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          },
          {
            "name": "Şurup Seçimi",
            "items": [
              "Şurupsuz (+₺0)",
              "Karamel Şurubu (+₺20)",
              "Vanilya Şurubu (+₺20)",
              "Fındık Şurubu (+₺20)"
            ]
          }
        ]
      },
      {
        "id": "SK-2",
        "name": "Cappuccino",
        "desc": "Cappuccino",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺190)",
              "Büyük (₺210)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SK-3",
        "name": "Americano",
        "desc": "Americano",
        "price": "₺150",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺150)",
              "Orta (₺170)",
              "Büyük (₺190)"
            ]
          }
        ]
      },
      {
        "id": "SK-4",
        "name": "Filtre Kahve",
        "desc": "Filter Coffee",
        "price": "₺150",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺150)",
              "Orta (₺170)",
              "Büyük (₺190)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Sütlü (+₺15)"
            ]
          }
        ]
      },
      {
        "id": "SK-5",
        "name": "Mocha",
        "desc": "Mocha",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SK-6",
        "name": "White Mocha",
        "desc": "White Mocha",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SK-7",
        "name": "Caramel Latte",
        "desc": "Caramel Latte",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SK-8",
        "name": "Caramel Macchiato",
        "desc": "Caramel Macchiato",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SK-9",
        "name": "Espresso",
        "desc": "Espresso (Klasikler)",
        "price": "₺130",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Tek (₺130)",
              "Double (₺150)"
            ]
          }
        ]
      },
      {
        "id": "SK-10",
        "name": "Türk Kahvesi (Orta Boy)",
        "desc": "Turkish Coffee (Medium)",
        "price": "₺120",
        "image": ""
      },
      {
        "id": "SK-11",
        "name": "Türk Kahvesi (Double)",
        "desc": "Turkish Coffee (Double)",
        "price": "₺180",
        "image": ""
      },
      {
        "id": "SK-12",
        "name": "Çay (Standart Boy)",
        "desc": "Tea (Standard)",
        "price": "₺75",
        "image": ""
      },
      {
        "id": "SK-13",
        "name": "Çay (Büyük Boy)",
        "desc": "Tea (Large)",
        "price": "₺120",
        "image": ""
      }
    ]
  },
  {
    "title": "Soğuk Kahveler",
    "items": [
      {
        "id": "SOK-1",
        "name": "Caramel Ice Banana Latte",
        "desc": "Caramel Ice Banana Latte",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-2",
        "name": "Ice Vanilya Latte",
        "desc": "Iced Vanilla Latte",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-3",
        "name": "Ice Caramel Latte",
        "desc": "Iced Caramel Latte",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-4",
        "name": "Ice Americano",
        "desc": "Iced Americano",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          }
        ]
      },
      {
        "id": "SOK-5",
        "name": "Ice Mocha",
        "desc": "Iced Mocha",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-6",
        "name": "Ice White Mocha",
        "desc": "Iced White Mocha",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-7",
        "name": "Ice Matcha Latte",
        "desc": "Iced Matcha Latte",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-8",
        "name": "Ice Fındıklı Latte",
        "desc": "Iced Hazelnut Latte",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-9",
        "name": "Ice Green Fıstıklı Latte",
        "desc": "Iced Green Pistachio Latte",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      },
      {
        "id": "SOK-10",
        "name": "Ice Caramel Macchiato",
        "desc": "Iced Caramel Macchiato",
        "price": "₺190",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺190)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "Normal Süt (+₺0)",
              "Laktozsuz Süt (+₺15)",
              "Soya Sütü (+₺30)",
              "Badem Sütü (+₺30)",
              "Yulaf Sütü (+₺30)"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Soğuk İçecekler",
    "items": [
      {
        "id": "SI-1",
        "name": "Naneli Cool Lime",
        "desc": "Mint Cool Lime",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          }
        ]
      },
      {
        "id": "SI-2",
        "name": "Çilekli Cool Lime",
        "desc": "Strawberry Cool Lime",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          }
        ]
      },
      {
        "id": "SI-3",
        "name": "Berry Hibiscus",
        "desc": "Berry Hibiscus",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          }
        ]
      },
      {
        "id": "SI-4",
        "name": "Banana & Strawberry Ice Milk",
        "desc": "Banana & Strawberry Ice Milk",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          }
        ]
      },
      {
        "id": "SI-5",
        "name": "Mango Fresha",
        "desc": "Mango Fresha",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          }
        ]
      },
      {
        "id": "SI-6",
        "name": "Ananas Fresha",
        "desc": "Pineapple Fresha",
        "price": "₺170",
        "image": "",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Küçük (₺170)",
              "Orta (₺210)",
              "Büyük (₺230)"
            ]
          }
        ]
      }
    ]
  }
];;

// ─── Menu Functions ──────────────────────────────────────────────

function getMenu() {
  try {
    const stored = localStorage.getItem(MENU_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  localStorage.setItem(MENU_KEY, JSON.stringify(defaultMenu));
  return defaultMenu;
}

function saveMenu(menu) {
  localStorage.setItem(MENU_KEY, JSON.stringify(menu));
  window.dispatchEvent(new CustomEvent('portavia_menu_updated'));
}

export function useMenu() {
  const [menu, setMenu] = useState(() => getMenu());

  useEffect(() => {
    const handler = () => setMenu(getMenu());
    window.addEventListener('portavia_menu_updated', handler);
    return () => window.removeEventListener('portavia_menu_updated', handler);
  }, []);

  return menu;
}

export function updateMenuItem(categoryIdx, itemIdx, updatedItem) {
  const menu = getMenu();
  if (menu[categoryIdx] && menu[categoryIdx].items[itemIdx]) {
    menu[categoryIdx].items[itemIdx] = { ...menu[categoryIdx].items[itemIdx], ...updatedItem };
    saveMenu(menu);
  }
}

export function addMenuItem(categoryIdx, newItem) {
  const menu = getMenu();
  if (menu[categoryIdx]) {
    menu[categoryIdx].items.push(newItem);
    saveMenu(menu);
  }
}

export function deleteMenuItem(categoryIdx, itemIdx) {
  const menu = getMenu();
  if (menu[categoryIdx] && menu[categoryIdx].items[itemIdx]) {
    menu[categoryIdx].items.splice(itemIdx, 1);
    saveMenu(menu);
  }
}

// ─── Orders Functions ────────────────────────────────────────────

export function getOrders() {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent('portavia_orders_updated'));
}

export function useOrders() {
  const [orders, setOrders] = useState(() => getOrders());

  const refresh = useCallback(() => {
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('portavia_orders_updated', handler);
    window.addEventListener('storage', handler);
    // Auto-refresh every 3 seconds
    const interval = setInterval(refresh, 3000);
    return () => {
      window.removeEventListener('portavia_orders_updated', handler);
      window.removeEventListener('storage', handler);
      clearInterval(interval);
    };
  }, [refresh]);

  return orders;
}

export function addOrder(order) {
  const orders = getOrders();
  const newOrder = {
    id: 'ORD-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...order,
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = newStatus;
    saveOrders(orders);
  }
}

// --- Waiter Calls Functions ---
const WAITER_CALLS_KEY = 'portavia_waiter_calls_v1';

export function getWaiterCalls() {
  try {
    const stored = localStorage.getItem(WAITER_CALLS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveWaiterCalls(calls) {
  localStorage.setItem(WAITER_CALLS_KEY, JSON.stringify(calls));
  window.dispatchEvent(new CustomEvent('portavia_waiter_calls_updated'));
}

export function useWaiterCalls() {
  const [calls, setCalls] = useState(() => getWaiterCalls());

  const refresh = useCallback(() => {
    setCalls(getWaiterCalls());
  }, []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('portavia_waiter_calls_updated', handler);
    window.addEventListener('storage', handler);
    const interval = setInterval(refresh, 3000);
    return () => {
      window.removeEventListener('portavia_waiter_calls_updated', handler);
      window.removeEventListener('storage', handler);
      clearInterval(interval);
    };
  }, [refresh]);

  return calls;
}

export function addWaiterCall(tableNumber) {
  const calls = getWaiterCalls();
  const newCall = {
    id: 'CALL-' + Date.now(),
    table: tableNumber,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  calls.unshift(newCall);
  saveWaiterCalls(calls);
  return newCall;
}

export function updateWaiterCallStatus(callId, newStatus) {
  const calls = getWaiterCalls();
  const idx = calls.findIndex(c => c.id === callId);
  if (idx !== -1) {
    if (newStatus === 'completed') {
      calls[idx].status = 'completed';
    } else if (newStatus === 'deleted') {
      calls.splice(idx, 1);
    }
    saveWaiterCalls(calls);
  }
}


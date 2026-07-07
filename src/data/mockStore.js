import { useState, useEffect, useCallback } from 'react';

const MENU_KEY = 'portavia_menu_v5';
const ORDERS_KEY = 'portavia_orders_v4';

const defaultMenu = [
  {
    "title": "Pizzalar",
    "items": [
      {
        "name": "Pizza Margherita",
        "desc": "Domatesin doğal asiditesi, mozarella peyniri, taze fesleğen ve zeytinyağının yalın dokunuşuyla bütünleşen zamansız bir klasik.",
        "price": "₺390",
        "image": "/images/margherita.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Melfi",
        "desc": "İstiridye mantarı, közlenmiş patlıcan, cherry domates, kırmızı soğan ve siyah zeytinin dengeli uyumuyla hazırlanan özel tarif.",
        "price": "₺460",
        "image": "/images/melfi.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Quattro Formaggi",
        "desc": "Mozarella, gorgonzola, ricotta ve parmesan peynirlerinin katmanlı lezzetlerini bir araya getiren güçlü ve rafine bir İtalyan yorumu.",
        "price": "₺510",
        "image": "/images/quattro-formaggi.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Pepperoni",
        "desc": "Mozarella peyniri üzerinde dana pepperoninin karakteristik aromasıyla öne çıkan sade ve iddialı bir lezzet.",
        "price": "₺580",
        "image": "/images/pepperoni.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Pollo",
        "desc": "Izgara tavuk, kırmızı soğan ve kestane mantarının parmesan peyniriyle zenginleştiği, taze kekik ve zeytinyağı ile tamamlanan özel tarif.",
        "price": "₺520",
        "image": "/images/pollo.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Bianca",
        "desc": "Parmesan kremasının kadifemsi dokusu, istiridye mantarı, sarımsak ve közlenmiş patlıcanın zarif uyumuyla hazırlanan özel lezzet.",
        "price": "₺490",
        "image": "/images/bianca.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Folingo",
        "desc": "Füme kaburga, roka ve parmesan peynirinin güçlü karakterini zeytinyağının aromasıyla buluştururan imza lezzetimiz.",
        "price": "₺620",
        "image": "/images/folingo.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Marino",
        "desc": "Jumbo karides, roka ve parmesan peynirinin Akdeniz karakterini yansıtan, zeytinyağının zarif dokunuşuyla tamamlanan seçkin lezzet.",
        "price": "₺540",
        "image": "/images/marino.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Frutti di Mare",
        "desc": "Jumbo karides ve ahtapotun denizden gelen güçlü aromalarını roka ve parmesan peyniriyle buluştururan özel deniz mahsulleri yorumu.",
        "price": "₺630",
        "image": "/images/frutti-di-mare.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Ferentino",
        "desc": "Dana sucuk, közlenmiş biber, istiridye mantarı ve siyah zeytinin dengeli birlikteliğiyle hazırlanan karakter sahibi tarif.",
        "price": "₺540",
        "image": "/images/ferentino.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Italiana",
        "desc": "Dana jambon, ricotta peyniri ve sarımsaklı pesto sosun kusursuz uyumuyla hazırlanan İtalyan mutfağından ilham alan rafine lezzet.",
        "price": "₺580",
        "image": "/images/italiana.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Pizza Anatolia",
        "desc": "Çemensiz pastırma ve dana sucuğun zengin aromalarını mozarella peyniriyle buluşturan, Anadolu'dan ilham alan güçlü yorum.",
        "price": "₺650",
        "image": "/images/anatolia.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Luna Rossa",
        "desc": "Burrata peyniri, vişne ve kavrulmuş cevizin sıra dışı uyumunu limon kabuğu, taze fesleğen ve acı bal dokunuşuyla taçlandıran imza lezzet.",
        "price": "₺900",
        "image": "/images/luna-rossa.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      },
      {
        "name": "Tartufo Bianco",
        "desc": "Karamelize soğan, kavrulmuş ceviz ve parmesan peynirin derin aromalarını beyaz trüf yağı ve taze kekikle buluşturan zarif gastronomi deneyimi.",
        "price": "₺710",
        "image": "/images/tartufo-bianco.png",
        "options": [
          {
            "name": "Hamur Seçimi",
            "items": [
              "İnce Hamur (Ücretsiz)"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Makarnalar",
    "items": [
      {
        "name": "Penne Arrabbiata",
        "desc": "San Marzano domateslerinin yoğun aroması, sarımsak ve kuru biberin karakteristik dokunuşlarıyla buluşur.",
        "image": "",
        "price": "₺390"
      },
      {
        "name": "Spaghetti Bolognese",
        "desc": "Uzun süre pişirilerek derinleşen dana ragü sosu, San Marzano domatesleri ve parmesan peyniriyle tamamlanır.",
        "image": "",
        "price": "₺460"
      },
      {
        "name": "Spaghetti Carbonara",
        "desc": "Yumurta sarısı, parmesan peyniri ve çemensiz pastırmanın kusursuz uyumuyla hazırlanan Roma klasiği.",
        "image": "",
        "price": "₺490"
      },
      {
        "name": "Fettucine Alfredo",
        "desc": "Parmesan kremasının kadifemsi dokusu, marine tavuk ve limon kabuğunun zarif aromalarıyla buluşur.",
        "image": "",
        "price": "₺420"
      },
      {
        "name": "Fettucine Gamberi",
        "desc": "Jumbo karides, parmesan kreması ve taze fesleğenin dengeli birlikteliğiyle hazırlanan rafine deniz mahsulleri yorumu.",
        "image": "",
        "price": "₺460"
      },
      {
        "name": "Fettucine Frutti di Mare",
        "desc": "Marine ahtapot ve jombo karidesin denizden gelen karakteri, ricotta ve San Marzano domateslerinin yumuşak dokusuyla bütünleşir.",
        "image": "",
        "price": "₺520"
      },
      {
        "name": "Tortellini Della Casa",
        "desc": "Peynir dolgulu tortellini, istiridye mantarı ve parmesan kremasının zengin aromalarıyla tamamlanan ev yapımı lezzet.",
        "image": "",
        "price": "₺590"
      },
      {
        "name": "Ravioli Rosmarino",
        "desc": "Peynir dolgulu ravioli, kestane mantarı ve parmesan kremasının uyumunu biberiyenin zarif notalarıyla buluşturur.",
        "image": "",
        "price": "₺590"
      },
      {
        "name": "Tagliatelle Bosco",
        "desc": "Armutun doğal tatlılığı, kavrulmuş cevizin karakteristik dokusu ve parmesan kremasının kadifemsi yapısını taze kekik notalarıyla buluşturan imza lezzet.",
        "image": "",
        "price": "₺510"
      },
      {
        "name": "Rigatoni Amarena",
        "desc": " Karamelize soan, vişne ve gorgonzolla peynirinin sıra dışı uyumuyla hazırlanan tatlı ve tuzlu notaları dengeli şekilde bir araya getiren cesur yorum.",
        "image": "",
        "price": "₺490"
      }
    ]
  },
  {
    "title": "Salatalar",
    "items": [
      {
        "name": "Insalata Pollo",
        "desc": "Izgara tavuk dilimleri, iceberg marulun ferah dokusu ve cherry domatesin canlı aromasıyla buluşur. Mısırın hafif tatlı notaları, özel Santa sos ve balzamik sosun dengeli uyumuyla tamamlanırken biberiye dokunuşu lezzete karakter kazandırır.",
        "image": "",
        "price": "₺390"
      },
      {
        "name": "Buratta e Pera",
        "desc": "Buratta peynirinin kremsi dokusunu; armutun zarif tatlılığı, pancarın topraksı karakteri ve taze rokanın canlı notalarıyla buluşturan özel tarif. Fıstık içi, limon kabuğu rendesi ve fesleğenli zeytinyağı ile tamamlanır.",
        "image": "",
        "price": "₺710"
      },
      {
        "name": "Insalata Tartufo ",
        "desc": "Rokanın hafif bibrerimsi karakterini, parmesan parçalarının yoğun aroması ve beyaz trüf yağının zarif dokunuşuyla buluşturan rafine bir lezzet. Cherry domates ve limon notalarıyla dengelenir.",
        "image": "",
        "price": "₺610"
      },
      {
        "name": "Insalata Amarena",
        "desc": "Taze vişnenin canlı aroması, suda mozarella ve rokanın ferah karakteriyle buluşur. Kavrulmuş ceviz, parmesan ve bal-limon sosunun dengeli dokunuşuyla tamamlanır.",
        "image": "",
        "price": "₺460"
      }
    ]
  },
  {
    "title": "Burgerler",
    "items": [
      {
        "name": "Black Burger",
        "desc": "Siyah burger ekmeği, dana burger köftesi (120 gr.), füme kaburga, kremalı istiridye mantarı, ızgara ananas",
        "image": "",
        "price": "₺520"
      },
      {
        "name": "Porta Burger",
        "desc": "Dana burger köftesi (120 gr.), cherry domates, taze roka, parmesan peyniri, pesto sos",
        "image": "",
        "price": "₺460"
      }
    ]
  },
  {
    "title": "Izgara Yemekleri",
    "items": [
      {
        "name": "Pollo Picatta",
        "desc": "Tereyağında son dokunuşu yapılan tavuk göğsü kaparinin karakteristik aroması ve limonun canlı notalarıyla buluşur. Parmesan kremasının kadifemsi dokusuyla tamamlanan zarif İtalyan klasiği.",
        "image": "",
        "price": "₺430"
      },
      {
        "name": "Pollo Parmigiana",
        "desc": "Izgara tavuk göğsü, San Marzano domateslerinin yoğun aroması ve taze biberiyenin Akdeniz karakteriyle buluşur. Sade görünümün altında derin lezzetler barındıran geleneksel yorum.",
        "image": "",
        "price": "₺450"
      },
      {
        "name": "Pollo Mimosa",
        "desc": "Fesleğenli pesto sosun canlı aroması, parmesan peyniri ve kremsi dokularla zenginleşir. Limon kabuğunun ferah notaları ve zeytinyağının zarif dokunuşuyla tamamlanan imza tarif.",
        "image": "",
        "price": "₺470"
      }
    ]
  },
  {
    "title": "Tava Yemekleri",
    "items": [
      {
        "name": "Pienza",
        "desc": "Jumbo karidesin denizden gelen karakteri San Marzano domateslerinin canlı aroması ve taze çekilmiş karabiber notalarıyla buluşur. Biberiyenin zarif dokunuşuyla tamamlanan Akdeniz esintili özek tarif.",
        "image": "",
        "price": "₺460"
      },
      {
        "name": "Frutti di Mare al Forno",
        "desc": "Ahtapot ve jumbo karidesin zengin deniz aromalarını; San Marzano domatesleri, közlenmiş patlıcan ve sarımsağın derin karakteriyle buluşturan özel yorum. Krema, limon kabuğu ve roka ile dengelenerek servis edilir.",
        "image": "",
        "price": "₺560"
      },
      {
        "name": "Pollo al Funghi",
        "desc": "arine tavuk, istiridye mantarı ve kestane mantarının aromatik birlikteliğini kremsi dokular ve taze biberiye notalarıyla tamamlayan zarif İtalyan klasiği.",
        "image": "",
        "price": "₺420"
      }
    ]
  },
  {
    "title": "Meşrubatlar",
    "items": [
      {
        "name": "Pepsi 1L",
        "desc": "",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Pepsi (330 ml)",
        "desc": "",
        "image": "",
        "price": "₺80"
      },
      {
        "name": "Pepsi Max (1L)",
        "desc": "Şekersiz",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Pepsi Max (330 ml)",
        "desc": "Şekersiz",
        "image": "",
        "price": "₺80"
      },
      {
        "name": "Yedigün (1L)",
        "desc": "",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Yedigün (330 ml)",
        "desc": "",
        "image": "",
        "price": "₺80"
      },
      {
        "name": "Icetea Limon (1L)",
        "desc": "",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Icetea Limon (330 ml)",
        "desc": "",
        "image": "",
        "price": "₺80"
      },
      {
        "name": "Icetea Şeftali (1L)",
        "desc": "",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Icetea Şeftali (330 ml)",
        "desc": "",
        "image": "",
        "price": "₺80"
      },
      {
        "name": "Icetea Mango (1L)",
        "desc": "",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Icetea Mango (330 ml)",
        "desc": "",
        "image": "",
        "price": "₺80"
      },
      {
        "name": "7UP (1L)",
        "desc": "",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Beyoğlu Gazoz",
        "desc": "",
        "image": "",
        "price": "₺95"
      },
      {
        "name": "Özerhisar ayran (1L)",
        "desc": "",
        "image": "",
        "price": "₺120"
      },
      {
        "name": "Özerhisar ayran (300 ml)",
        "desc": "",
        "image": "",
        "price": "₺80"
      },
      {
        "name": "St. Pellegrino Mineralli Su (750 ml)",
        "desc": "Cam şişe",
        "image": "",
        "price": "₺350"
      },
      {
        "name": "St. Pellegrino Mineralli Su (250 ml)",
        "desc": "Cam şişe",
        "image": "",
        "price": "₺180"
      },
      {
        "name": "Su (500 ml)",
        "desc": "Pet",
        "image": "",
        "price": "₺50"
      },
      {
        "name": "Su (33 cl)",
        "desc": "Cam Şişe",
        "image": "",
        "price": "₺75"
      }
    ]
  },
  {
    "title": "Sıcak Kahveler",
    "items": [
      {
        "name": "Caramel Macchiato",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Espresso",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺130",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Espresso (₺130)",
              "Double Espresso (₺150)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Filtre Kahve",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺150",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺150)",
              "Medium (₺170)",
              "Large (₺190)"
            ]
          }
        ]
      },
      {
        "name": "Cappucino",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺190)",
              "Large (₺210)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Caramel Latte",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Americano",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺150",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺150)",
              "Medium (₺170)",
              "Large (₺190)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Coffee Latte",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺190)",
              "Large (₺210)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "White Mocha",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Mocha",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Soğuk Kahveler",
    "items": [
      {
        "name": "Iced Vanilla Latte",
        "desc": "Soğuk Servis Edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Caramel Ice Banana Latte",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced Americano",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced Caramel Latte",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced Caramel Macchiato",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced Mocha",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced White Mocha",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced Green Fıstıklı Latte",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced Fındıklı Mocha",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      },
      {
        "name": "Iced Matcha Latte",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺190",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺190)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          },
          {
            "name": "Kahve Seçimi",
            "items": [
              "Standart Espresso",
              "Kafeinsiz Espresso",
              "Ekstra Espresso Shot (+₺35)"
            ]
          },
          {
            "name": "Süt Seçimi",
            "items": [
              "%2 Yağlı Süt",
              "Laktozsuz Süt",
              "Badem Sütü (+₺55)",
              "Soya Sütü (+₺55)"
            ]
          },
          {
            "name": "Ekstra Şeker Seçimi",
            "items": [
              "Beyaz Şeker (+₺5)"
            ]
          },
          {
            "name": "Ekstra Sos & Şurup Seçimi",
            "items": [
              "White Mocha Sos (+₺20)",
              "Mocha Sos (+₺20)",
              "Karamel Sos (+₺20)",
              "Çilek Sos (+₺20)",
              "Nane Şurubu (+₺30)",
              "Fındık Şurubu (+₺30)",
              "Boğürtlen Şurubu (+₺30)",
              "Karamel Şurubu (+₺30)",
              "Vanilya Şurubu (+₺30)"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Sıcak İçecekler",
    "items": [
      {
        "name": "Türk Kahvesi",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺120",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Türk Kahvesi (₺120)",
              "Double Türk Kahvesi (₺180)"
            ]
          },
          {
            "name": "Kahvenizi Nasıl İstersiniz?",
            "items": [
              "Sade (+₺Şekerli)"
            ]
          }
        ]
      },
      {
        "name": "Çay",
        "desc": "Sıcak servis edilir",
        "image": "",
        "price": "₺75",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Standart Boy (₺75)",
              "Büyük Boy (₺120)"
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
        "name": "Naneli Cool Lime",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          }
        ]
      },
      {
        "name": "Çilekli Cool Lime",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          }
        ]
      },
      {
        "name": "Berry Hibiscus",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          }
        ]
      },
      {
        "name": "Banana&Strawberry Iced Milk",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          }
        ]
      },
      {
        "name": "Mango Fresha",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          }
        ]
      },
      {
        "name": "Ananas Fresha",
        "desc": "Soğuk servis edilir",
        "image": "",
        "price": "₺170",
        "options": [
          {
            "name": "Boy Seçimi",
            "items": [
              "Small (₺170)",
              "Medium (₺210)",
              "Large (₺230)"
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Tatlılar",
    "items": [
      {
        "name": "Çikolatalı Sufle",
        "desc": "Yoğun kakao aroması ve akışkan çikolata dolgusuyla hazırlanan sıcak lezzet.",
        "image": "",
        "price": "₺250"
      },
      {
        "name": "Marlenka",
        "desc": "Balın karakteristik aromasıyla katmanlanan, yumuşak dokusu ve yoğun lezzetiyle öne çıkan özel tarif.",
        "image": "",
        "price": "₺390"
      },
      {
        "name": "San Sebastian",
        "desc": "Karamelize yüzeyi ve akışkan dokusuyla servis edilen, modern pastacılığın en sevilen yorumlarından biri",
        "image": "",
        "price": "₺390"
      },
      {
        "name": "Lemon Posset",
        "desc": "Taze limonun ferah karakterini kadifemsi krema dokusuyla buluşturan, hafif ve zarif İngiliz klasiği. Yemek sonrası için kusursuz bir final.",
        "image": "",
        "price": "₺60"
      },
      {
        "name": "Panna Cotta",
        "desc": "İpeksi dokusu ve hafif vanilya aromasıyla tatlı bir ferahlık sunan İtalyan klasiği",
        "image": "",
        "price": "₺250"
      },
      {
        "name": "Tiramisu",
        "desc": "Mascarpone kreması, espresso ve kakao notalarının kusursuz dengesiyle hazırlanan zamansız İtalyan klasiği",
        "image": "",
        "price": "₺360"
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


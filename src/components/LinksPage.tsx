import React from 'react';
import { ExternalLink, Book, Microscope, GraduationCap, ShoppingBag, Users, Heart } from 'lucide-react';

interface LinkCategory {
  title: string;
  icon: React.ElementType;
  links: {
    title: string;
    url: string;
    description: string;
  }[];
}

export function LinksPage() {
  const categories: LinkCategory[] = [
    {
      title: "Educational Resources",
      icon: GraduationCap,
      links: [
        {
          title: "North American Mycological Association",
          url: "https://namyco.org",
          description: "Leading organization promoting scientific and educational activities related to fungi."
        },
        {
          title: "MushroomExpert.com",
          url: "http://www.mushroomexpert.com",
          description: "Comprehensive resource for mushroom identification and taxonomy."
        }
      ]
    },
    {
      title: "Scientific Research",
      icon: Microscope,
      links: [
        {
          title: "MycoBank Database",
          url: "https://www.mycobank.org",
          description: "Comprehensive database of mycological nomenclature."
        },
        {
          title: "International Journal of Medicinal Mushrooms",
          url: "https://www.begellhouse.com/journals/medicinal-mushrooms.html",
          description: "Academic journal focused on medicinal mushroom research."
        }
      ]
    },
    {
      title: "Community Forums",
      icon: Users,
      links: [
        {
          title: "Shroomery",
          url: "https://www.shroomery.org",
          description: "Active community forum for mushroom cultivation discussions."
        },
        {
          title: "Reddit r/mycology",
          url: "https://www.reddit.com/r/mycology",
          description: "Reddit's mushroom identification and discussion community."
        }
      ]
    },
    {
      title: "Cultivation Supplies",
      icon: ShoppingBag,
      links: [
        {
          title: "Field & Forest Products",
          url: "https://www.fieldforest.net",
          description: "Quality mushroom spawn and cultivation supplies."
        },
        {
          title: "North Spore",
          url: "https://northspore.com",
          description: "Premium mushroom cultivation supplies and educational resources."
        }
      ]
    },
    {
      title: "Books & Literature",
      icon: Book,
      links: [
        {
          title: "Growing Gourmet and Medicinal Mushrooms",
          url: "https://www.amazon.com/Growing-Gourmet-Medicinal-Mushrooms-Stamets/dp/1580081754",
          description: "Essential guide by Paul Stamets."
        },
        {
          title: "Organic Mushroom Farming and Mycoremediation",
          url: "https://www.amazon.com/Organic-Mushroom-Farming-Mycoremediation-Experimental/dp/1603584552",
          description: "Comprehensive guide to mushroom cultivation."
        }
      ]
    },
    {
      title: "Health & Wellness",
      icon: Heart,
      links: [
        {
          title: "Memorial Sloan Kettering - About Herbs",
          url: "https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs",
          description: "Evidence-based information about medicinal mushrooms."
        },
        {
          title: "Examine.com Mushroom Guides",
          url: "https://examine.com/supplements/reishi/",
          description: "Scientific analysis of mushroom supplements."
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-amber-900 mb-8">Useful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-amber-50/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="w-6 h-6 text-amber-700" />
                <h3 className="text-xl font-semibold text-amber-900">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-amber-900">{link.title}</span>
                      <ExternalLink className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-sm text-amber-700">{link.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
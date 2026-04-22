import { LuEye, LuLink, LuMousePointer2 } from "react-icons/lu";
import { TbChartBar } from "react-icons/tb";

const links = [
    {
      title: "Como criar uma estratégia de marketing digital completa",
      url: "www.exemplo.com/blog/como-criar-uma-estrategia-de-marketing-digital-completa",
      short: "shorturl.com/abcd123",
      clicks: "4.532",
      date: "24/05/2024",
    },
    {
      title: "Guia definitivo de SEO para iniciantes",
      url: "www.exemplo.com/blog/guia-seo-iniciantes",
      short: "shorturl.com/efgh456",
      clicks: "3.201",
      date: "20/05/2024",
    },
    {
      title: "10 ferramentas essenciais para desenvolvedores",
      url: "www.exemplo.com/blog/ferramentas-desenvolvedores",
      short: "shorturl.com/ijk789",
      clicks: "2.840",
      date: "18/05/2024",
    },
    {
      title: "Tendências de design para 2024",
      url: "www.exemplo.com/blog/tendencias-design-2024",
      short: "shorturl.com/mnop101",
      clicks: "1.987",
      date: "15/05/2024",
    },
];

const metrics = [
  { label: "Links Criados", value: "1.248", icon: <LuLink />, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", perc: "+12%" },
  { label: "Cliques Totais", value: "25.684", icon: <LuEye />, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10", perc: "+18%" },
  { label: "Cliques Únicos", value: "18.429", icon: <LuMousePointer2 />, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", perc: "+15%" },
  { label: "Taxa de Cliques", value: "71,8%", icon: <TbChartBar />, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10", perc: "+8%" },
];

export { links, metrics};
import { useContext } from "react"
import FooterBg from "@/assets/images/footer.png"
import Logo from "@/assets/icons/logo.svg?react"
import Instagram from "@/assets/icons/instagram.svg?react"
import Twitter from "@/assets/icons/twitter.svg?react"
import Youtube from "@/assets/icons/youtube.svg?react"
import data from "./footerData.json"
import { ThemeContext } from "@/context/ThemeContext"

export default function Footer() {
  const { theme } = useContext(ThemeContext)
  return (
    <footer className="bg-lightGreen dark:bg-black flex justify-center dark:border dark:border-t-white">
      <div
        className="wrapper-common flex-col bg-cover bg-center h-[600px]"
        style={{ backgroundImage: theme === 'dark' ? 'none' : `url(${FooterBg})` }}
      >
        <div className="flex justify-between text-darkGray dark:text-white w-full py-27 border-b-[#7E828F17] border-b-1">
          <div className="flex flex-col">
            <Logo className="w-10 text-blue-500" />
            <p className="text-lg mt-6">
              Takeaway & Delivery template
              <br />
              <span className="text-base">for small - medium businesses.</span>
            </p>
          </div>
          <div className="flex flex-row gap-28 pr-20">
            {data.sections.map((section, index) => (
              <div key={index} className="flex flex-col gap-6 min-w-[110px]">
                <p className="text-lg uppercase text-black dark:text-gray-200">{section.title}</p>
                <ul className="flex flex-col gap-6">
                  {section.links.map((link, i) => (
                    <li key={i} className="hover:cursor-pointer">
                      {section.title === "Template" ? (
                        <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {link.name}
                        </a>
                      ) : (
                        <span>{link.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow flex items-center justify-between">
          <div className="flex dark:text-white">
            <p>
              Built by <span className="text-green">Flowbase</span>
            </p>
            <p>
              · Powered by <span className="text-green">Webflow</span>
            </p>
          </div>
          <div className="flex gap-6">
            <div className="p-2 rounded-full border-2 border-[#7E828F4D]">
              <Instagram className="w-5 h-5 hover:cursor-pointer dark:text-white" />
            </div>
            <div className="p-2 rounded-full border-2 border-[#7E828F4D]">
              <Twitter className="w-5 h-5 hover:cursor-pointer dark:text-white" />
            </div>
            <div className="p-2 rounded-full border-2 border-[#7E828F4D]">
              <Youtube className="w-5 h-5 hover:cursor-pointer dark:text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

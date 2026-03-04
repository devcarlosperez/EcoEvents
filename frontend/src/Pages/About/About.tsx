import style from './../About/About.module.scss'

export function About() {
    return (
        <div>
         
            {/* first card */}
  
                <div className={style.textContainer}>
                    <h2><b>About</b></h2>
                    <p>
                      <p>EcoEvents is a community web application created to make it easier for people to take action and help protect the environment.</p>  
                     <p><b>Our mission is simple:</b> connect individuals who care about the planet and give them the tools to organize and participate in meaningful environmental activities.</p>  
                     <p>Users can create and join local eco-friendly events such as beach clean-ups, tree planting in areas affected by wildfires and other environmental initiatives.</p>   
                    </p>
                </div>

            {/* Tre cards below */}
            <div className={style.cardContainer}>
                {[1, 2, 3].map((card) => (
                    <div
                        key={card}
                        className="bg-white shadow-lg rounded-2xl p-6 text-center"
                    >
                        <h3 className="text-lg font-semibold mb-2">
                             Nature facts{card}
                        </h3>
                        <p className="text-gray-600">
                           
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
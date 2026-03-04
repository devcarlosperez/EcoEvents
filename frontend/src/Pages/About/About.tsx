import style from './../About/About.module.scss'

export function About() {
    return (
        <div className="min-h-screen px-6 py-10">
         
            {/* first card */}
  
                <div className={style.textcontainer}>
                    <h2><b>About</b></h2>
                    <p className="text-gray-600">
                      <p>EcoEvents is a community web application created to make it easier for people to take action and help protect the environment.</p>  
                     <p><b>Our mission is simple:</b> connect individuals who care about the planet and give them the tools to organize and participate in meaningful environmental activities.</p>  
                     <p>Users can create and join local eco-friendly events such as beach clean-ups, tree planting in areas affected by wildfires and other environmental initiatives.</p>   
                    </p>
                </div>

            {/* Tre cards below */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
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
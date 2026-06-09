import { successStoryModel } from "../models/successStory.js";

// Simulated function to fetch success stories
export const getSuccessStories = async () => {
  const stories = [
    {
        name:"Laxmi's Courageous Escape (Not her real name)",
        story:"Laxmi was a young woman from a village in Madhya Pradesh who was trafficked into a brothel in Kolkata at the age of 18. After being coerced into sex work for several years, Laxmi managed to escape when a woman from a local NGO, Sanlaap, visited the brothel for outreach and offered help. Sanlaap, a prominent organization focusing on the rescue and rehabilitation of women from trafficking, took Laxmi to a shelter where she was provided with shelter, medical care, and psychological counseling.Over time, Laxmi rebuilt her life. She was introduced to computer skills training and began working with Sanlaap as a program coordinator. Laxmi now advocates for women's rights and speaks to groups of at-risk girls about trafficking, empowering them to recognize the dangers and make informed decisions about their lives.She is also involved in youth outreach programs in schools and communities, raising awareness about gender equality, human trafficking, and women’s empowerment. Her story has inspired many other women to escape exploitation and take control of their lives.",
        imageUrl:"https://theamikusqriae.com/wp-content/uploads/2024/06/51291-enkbmjdfya-1486906901.jpg",
    },
    {
      name: "Suman's Fight for Justice (Not her real name)",
      story: "Suman was trafficked into Delhi’s red-light area at the age of 18, lured by promises of a good job. She faced years of forced sex work before she was rescued by RAHAT, a Delhi-based organization that focuses on rescuing and rehabilitating survivors of sex trafficking.After her rescue, Suman spent years in therapy, working through the trauma she had experienced. She found strength in her desire to fight for justice for women like herself. With support from RAHAT, Suman pursued a degree in law and eventually became a human rights lawyer, specializing in cases related to trafficking and gender-based violence.Suman now works as a legal advisor for RAHAT, offering free legal aid to women seeking justice for trafficking and exploitation. She is also a public speaker, spreading awareness about the legal rights of women in the sex trade and helping to create policies that protect survivors. ",
      imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0002e339324087.5606ae874ff57.jpg",
    },
    {
      name: "Meenal’s Dream to Empower (Not her real name)",
      story: "Meenal, born into a family living in poverty in Bihar, was trafficked to a brothel in Mumbai when she was just 16. For years, she suffered physical abuse and exploitation until she was rescued by The Salaam Baalak Trust, an organization that works to rehabilitate children and women from the sex trade.During her recovery, Meenal was given the opportunity to attend school and develop life skills. She was introduced to entrepreneurship training, which sparked her interest in business. After completing her studies, Meenal started her own boutique business and began offering employment opportunities to other women who had escaped trafficking.Today, Meenal runs a successful boutique and training center that helps women who have faced exploitation to learn new skills and achieve financial independence. She also volunteers at The Salaam Baalak Trust, providing mentorship and guidance to other survivors. Meenal believes that empowering women through financial independence is key to breaking the cycle of exploitation.",
      imageUrl: "https://www.nextias.com/blog/wp-content/uploads/2024/02/challenges-of-women-empowerment.png",
    },
    {
        name:"Sita's Healing through Storytelling (Not her real name)",
        story:"Sita was trafficked from Nepal to India and forced into sex work at the age of 17. After being rescued by Maiti Nepal, a non-governmental organization dedicated to the prevention of trafficking and the rehabilitation of survivors, Sita found herself in a safe shelter. The organization provided her with both psychological and physical healing. During her recovery, Sita began to write about her experiences as a way to process her trauma. Her writings were later published, and she became a published author, telling her story of survival and empowerment. Sita has since used her platform to raise awareness about the dangers of trafficking and the need for prevention.Sita now works with Maiti Nepal, training community leaders and young girls in rural areas about the dangers of trafficking and how to avoid becoming victims. Through her personal story, she has inspired many young women to fight for their futures and never give up hope.",
        imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtPFZUAEiDzbIjY3hopkq_RKvyn0EJrwBIg&s"
    },
    {
        name:"Rani's Recovery and Advocacy (Not her real name)",
        story:"Rani was sold into a brothel at the age of 14. She spent years in one of the notorious red-light districts of Hyderabad, where she was trapped in a life of forced prostitution. It was only when the International Justice Mission (IJM) intervened in a police raid that Rani was freed. The IJM is a global organization that works to rescue victims of human trafficking and provide long-term rehabilitation.After her rescue, Rani was taken to a rehabilitation center where she received support in the form of counseling, legal assistance, and vocational training. She learned computing skills and was given the opportunity to complete her schooling.Rani now works with IJM as a trafficking survivor advocate, helping to raise awareness about the horrors of sex trafficking. She also provides emotional support and mentorship to women in similar situations. Rani’s work focuses on providing a platform for survivors' voices, making sure their stories are heard and their rights protected."
        ,imageUrl:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a9916839324099.5606b07f9eb55.jpg"
    
    },{
        name:"Meera's Journey (Not her real name)",
        story:"Meera, originally from West Bengal, was trafficked at the age of 14 and forced into prostitution in one of the brothels in Mumbai. She endured years of physical and psychological abuse, but her life began to change when she was rescued during a police raid. Meera was taken to a shelter supported by Gharaunda, an NGO that focuses on providing shelter and education to survivors of sex trafficking.In the shelter, Meera was given counseling, and her basic education was restored. With time, she developed a passion for art and started painting to express her feelings and trauma. Her artwork became a powerful tool for healing, and Meera began teaching art to other women in the shelter.Today, Meera runs an art therapy program for survivors of trafficking and abuse. She has also held exhibitions showcasing the artwork of women like herself, which have gained recognition in art communities. She continues to speak out about her experiences and is involved in advocacy for women's rights and raising awareness about human trafficking.",
        imageUrl:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcShpZ1PLrZuaSSeKqCEtviz1dyh9MSDmY87LbexuVjEU_bAmdog"
    }
  ];

  return stories.map(story => ({
    ...successStoryModel, // Ensure each story matches the model schema
    ...story,
  }));
};
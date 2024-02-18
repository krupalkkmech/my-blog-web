import React from 'react';
import {
  LikeOutlined,
  CommentOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { Layout, Flex, Typography, Divider } from 'antd';
import { useSpeechSynthesis } from 'react-speech-kit';
import './index.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const paragraphValue =
  'We can all agree that Figma has changed how we work in UX/UI design, making everything simpler and all in one place. However, even with Figma’s amazing features and plugins, there are other apps and websites I use every day that Figma can’t replace. Each serves a special purpose that extends beyond Figma’s reach. So, I want to share seven of my favorite apps/websites that I use along with Figma. Hopefully, you will find them as useful as I do for creating things smoothly and handling tasks Figma doesn’t cover, showing that sometimes you need a mix of tools to do your best work. For Inspiration: Mobbin Key features: iOS, Web and Android app screens, flows, UI components, updates almost weekly. Available in Free and Pro versions. Notable mentions: Landbook, Nicelydone Landingfolio I come from a generation of designers who scoured every corner of the internet for inspiration, going from specialized websites to Pinterest, and later on, to platforms like Behance and Dribbble. Have you ever seen a website and wondered how it was made, what tools were used, or how the different parts work together? We learn a lot by looking at things, right? So, while looking for a big collection of design ideas, I’ve discovered Mobbin about two years ago. It has loads of real websites and mobile apps, different designs, and ways things flow that can give you new ideas and help you in your design work. Mobbin comes with both free and pro options, but even without a subscription, you can access a world of tried-and-tested designs, easily capturing screenshots in PNG format to compare with your work in Figma. These real-world examples provide a solid reference, helping you understand how your flows should operate, identify any missing elements, and so forth. Plus, the site is updated quite frequently, keeping the content fresh and relevant. Whether you’re sketching out the initial concepts or putting the finishing touches on a project, Mobbin is a go-to resource for keeping the creative juices flowing. For Research: Lyssna, Maze Lyssna can quickly become a valuable tool for you. It positions itself as a comprehensive user research platform, aimed at helping teams gain deep understanding of their audience for more informed decision-making. The platform facilitates the creation of a variety of usability tests and user interviews, allowing you to bring the voice of your audience into every design decision you make. Key features include a wide range of testing methodologies for usability testing, tools for organizing and conducting user interviews, surveys for validating assumptions, and access to a large panel for diverse user feedback. These capabilities can greatly enhance your UX design process by providing clear, actionable insights based on user feedback and testing. Offers free and paid plans Notable mentions: Maze Key features: user research through prototype testing, card sorting, website testing, and interview studies, moderated/unmoderated tests and panel recruitment, fostering cross-functional workflows Offers free and paid options Gathering Data: Typeform Key features: Templates for different purposes, clean UI, conditionals for complex surveys Available in Free and Pro versions. Notable mentions: Google Forms As UX designers, the ability to distill complex user data into clear, actionable insights is essential in our everyday work, shaping the very foundation of user-centric designs. Data visualization emerges as a lifeline in this scenario, turning volumes of raw data into understandable forms, thereby directly informing our design decisions with clarity and precision. In our continuous pursuit of design fluency and efficiency, tools like Typeform are invaluable. They serve as conduits for capturing user feedback through aesthetically pleasing, interactive surveys, ensuring we gather essential data without compromising on user engagement. This integration of data collection and visualization keeps us in our creative groove, eliminating jarring transitions between analysis and design. It streamlines our workflow, helps validate our design instincts with real-world user narratives, and empowers us to craft experiences that resonate more deeply with the end-users because we’re not just working on hunches, but steering our designs based on stories the data tells us.';

function BlogDetails() {
  const { speak } = useSpeechSynthesis();
  return (
    <Layout>
      <Header className="rootHeader">Blogger Site</Header>
      <Content>
        <Flex vertical className="mainFlexBlogDetails">
          <Title level={2}>
            7 Apps & Websites I use every day as a UX/UI designer Elenee Ch UX Planet
          </Title>
          <Divider />
          <Flex justify="space-between">
            <Flex>
              <LikeOutlined className="detailsIcon" />
              <span className="detailsIcon">1.96k</span>{' '}
              <CommentOutlined className="detailsIcon marginLeft" />{' '}
              <span className="detailsIcon">1.96k</span>
            </Flex>
            <Flex>
              <SaveOutlined className="detailsIcon " />
              <PlayCircleOutlined
                className="detailsIcon marginLeft"
                onClick={() => speak({ text: paragraphValue })}
              />
              <ShareAltOutlined className="detailsIcon marginLeft" />
            </Flex>
          </Flex>
          <Divider />
          <Paragraph>{paragraphValue}</Paragraph>
        </Flex>
      </Content>
    </Layout>
  );
}

export default BlogDetails;

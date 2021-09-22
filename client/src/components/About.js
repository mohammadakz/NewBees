import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Wrapper>
      <Container>
        <h1>About</h1>
        <AboutUs>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
            cursus ante. Donec iaculis ex ut tortor luctus mollis. Aenean mauris
            odio, feugiat a condimentum in, consectetur a sapien. Sed interdum
            libero ipsum, gravida malesuada ex elementum pharetra. Suspendisse
            malesuada lacinia lacinia. Vestibulum non erat ut felis consectetur
            rhoncus quis a justo. Nullam sagittis sapien eget euismod suscipit.
            In rhoncus scelerisque mollis. Sed tristique suscipit iaculis. Cras
            leo ante, hendrerit sed urna molestie, gravida facilisis tellus.
            Fusce a rutrum erat, tincidunt bibendum justo. Cras eget mi dolor.
            Nulla at auctor metus. Ut vel lobortis nibh. Nam vel nunc velit.
          </p>
          <p>
            Donec volutpat massa non neque pharetra aliquet. Vestibulum justo
            felis, cursus quis magna in, euismod dapibus mauris. Integer
            pretium, diam sit amet consequat rutrum, elit metus faucibus ligula,
            at ullamcorper libero ex non orci. Integer lorem justo, iaculis
            hendrerit leo ut, lacinia pulvinar felis. Praesent porta porttitor
            ante id varius. In molestie odio eget erat dictum, ac pretium lectus
            sollicitudin. Fusce placerat mi non est volutpat interdum. Sed
            feugiat, odio a porta tincidunt, quam velit dictum lectus, ut
            bibendum velit est vehicula massa.
          </p>
        </AboutUs>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  margin-top: 50px;
`;

const Container = styled.div`
  font-family: sans-serif;
  width: 75%;
  margin: 0 auto;
`;

const AboutUs = styled.article`
  width: 100%;

  p {
    line-height: 1.6;
  }
`;

export default About;

import styled from "styled-components"
import HomeImg from "@/assets/images/home.png"
import HomeBg from "@/assets/images/home-bg.png"
import Trustpilot from "@/assets/images/trustpilot.png"

const Main = styled.main`
  min-height: 820px;
  background-image: url(${HomeBg});
  background-size: cover;
  display: flex;
  justify-content: center;
  padding-top: 10rem;
  padding-bottom: 7rem;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Heading = styled.h1`
  font-size: 60px;
  line-height: 60px;
  letter-spacing: 0.05em;
  font-weight: bold;

  span {
    color: var(--color-green);
  }
`

const Paragraph = styled.p`
  margin-top: 2rem;
  font-size: 1.125rem; /* 18px */
  color: var(--color-darkGray);
  line-height: 1.6;
`

const Button = styled.button`
  margin-top: 3rem;
  padding: 1rem 2.5rem;
  background-color: var(--color-green);
  border-radius: 0.375rem;
  color: white;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;

  img {
    width: 7rem;
  }

  p {
    span {
      color: var(--color-green);
    }
  }
`

export default function Home() {
  return (
    <Main>
      <Wrapper>
        <div>
          <Heading>
            Beautiful food & takeaway, <span>delivered</span> to your door.
          </Heading>
          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and<br />
            typesetting industry. Lorem Ipsum has been the industry's<br />
            standard dummy text ever since the 1500.
          </Paragraph>
          <Button>Place an Order</Button>
          <ReviewSection>
            <img src={Trustpilot} alt="Trustpilot" />
            <p>
              <span>4.8 out of 5</span> based on 2000+ reviews
            </p>
          </ReviewSection>
        </div>
        <img src={HomeImg} alt="Home" />
      </Wrapper>
    </Main>
  )
}

import styled from "styled-components/native";
import { theme } from "../../theme";

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 15px;
  margin-top: -15%;

  color: #000;
  background-color: #fff;

  border-radius: 50px;
`;

export const PokemonName = styled.Text`
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  line-height: 24px;

  color: #000;
  font-family: ${theme.fonts.title};
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 15px;
  margin-bottom: 20px;

  color: #000;
  background-color: #fff;
  font-family: ${theme.fonts.normal};

  border-radius: 50px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  width: 50%;
  justify-content: space-between;
  justify-content: center;
`;

interface ButtonTextProps {
  color?: string;
}
export const ButtonText = styled.Text`
  font-size: 12px;
  font-family: ${theme.fonts.normal};
  color: ${(props: ButtonTextProps) =>
    props.color ? props.color : theme.colors.black};
  padding-left: 5px;
`;

export const Divisor = styled.View`
  width: 1px;
  height: 100%;
  background-color: ${theme.colors.black};
  margin: 0 5px;
`;

export const Card = styled.View`
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  padding: 8%;
  border-radius: 25px;

  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
`;

export const CardTitle = styled.Text`
  text-align: left;
  font-family: ${theme.fonts.title};
  font-size: 15px;
  line-height: 18px;
  color: ${theme.colors.black};
`;

export const CardSubtitle = styled.Text`
  font-family: ${theme.fonts.subTitle};
  font-size: 13px;
  line-height: 18px;
  margin-left: 10px;

  color: ${theme.colors.black};
`;

export const SectionTitle = styled.Text`
  text-align: left;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 15px;
  padding: 0px 10px;
  width: 100%;

  font-style: normal;
  font-family: ${theme.fonts.subTitle};
  color: ${theme.colors.black};
`;

export const SkillsContainer = styled.ScrollView`
  width: 100%;
  height: 150px;
  padding: 5px;
`;

interface SkillProps {
  color?: string;
}
export const Skill = styled.View`
  background-color: ${(props: SkillProps) =>
    props.color ? props.color : theme.colors.white};
  border-radius: 25px;
  padding: 5px;
  min-width: 200px;
  min-height: 50px;
  margin-right: 8px;

  justify-content: center;
`;

export const SkillLabel = styled.Text`
  text-align: center;
  color: ${theme.colors.black};
  font-size: 12px;
`;

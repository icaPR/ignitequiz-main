import { View, Text, Dimensions } from "react-native";
import Animated, { FadeInUp, Keyframe } from "react-native-reanimated";
import { Option } from "../Option";
import { styles } from "./styles";

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
}: Props) {
  const enteringKeyframe = new Keyframe({
    from: {
      opacity: 0,
      transform: [{ translateX: 0 }, { rotate: "90deg" }],
    },
    to: {
      opacity: 1,
      transform: [{ translateX: SCREEN_WIDTH }, { rotate: "0deg" }],
    },
  });
  const exitingKeyframe = new Keyframe({
    from: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
    to: {
      opacity: 0,
      transform: [{ translateX: SCREEN_WIDTH * -1 }, { rotate: "-90deg" }],
    },
  });

  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyframe.duration(400)}
      exiting={exitingKeyframe.duration(400)}
    >
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  );
}

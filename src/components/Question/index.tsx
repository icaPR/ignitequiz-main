import { Text, Dimensions } from "react-native";
import Animated, { Keyframe, runOnJS } from "react-native-reanimated";
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
  onUnmount: () => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
  onUnmount,
}: Props) {
  const enteringKeyframe = new Keyframe({
    form: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const exitingKeyframe = new Keyframe({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  });

  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyframe}
      exiting={exitingKeyframe.duration(400).withCallback((finished) => {
        "worklet";
        if (finished) {
          runOnJS(onUnmount)();
        }
      })}
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

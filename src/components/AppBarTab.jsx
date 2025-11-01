import { Pressable, Text } from "react-native"

const AppBartab = ({ styles, children }) => (
    <Pressable>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
)

export default AppBartab
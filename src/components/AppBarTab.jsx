import Text from "./Text"
import { Link } from "react-router-native"

const AppBartab = ({ styles, route, children, handlePress}) => (
    <Link to={route} onPress={handlePress}>
      <Text style={styles.text}>{children}</Text>
    </Link>
)

export default AppBartab
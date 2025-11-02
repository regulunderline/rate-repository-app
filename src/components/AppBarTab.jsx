import Text from "./Text"
import { Link } from "react-router-native"

const AppBartab = ({ styles, route, children }) => (
    <Link to={route}>
      <Text style={styles.text}>{children}</Text>
    </Link>
)

export default AppBartab


import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

                    
                        <Divider className={classes.divider} />
                       
                        
                        <Link href="/AllEmployers" className={`${classes.iconLink} ${path === activePaths.AllEmployers ? classes.active : ""}`}>
                            <Groups2OutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Всички служители
                            </Typography>}
                        </Link>
                        <Link href="/AddEmployer" className={`${classes.iconLink} ${path === activePaths.AddEmployer ? classes.active : ""}`}>
                            <PersonAddOutlinedIcon style={{ marginRight: "10px" }} className={classes.icon} />
                            {!isCollapsed && <Typography className={classes.button}>
                                Добави служител
                            </Typography>}
                        </Link>
       
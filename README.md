# MakeMBTItest MBTI 테스트 만들기
**MBTI 테스트를 만들고 실행까지 할 수 있는 웹사이트 입니다.**
[(링크)](https://calm-tundra-05138.herokuapp.com)

MBTI 테스트가 유행하면서 기존의 MBTI 테스트에 여러 가지 테마를 덧붙여 새로운 테스트를 만들기도 합니다(예시: [롤 MBTI](https://next.op.gg/mbti), [디즈니 MBTI](https://poomang.com/disneyprincess2021?c=9&kc=7878)). 이 웹사이트는 자신의 웹사이트를 구축하지 않더라도 MBTI 테스트를 만들고 공유할 수 있게 해줍니다.

### 주요기능
1. MBTI 테스트 만들기
2. MBTI 테스트 실행하고 결과 얻기
3. MBTI 테스트 수정 / 삭제
4. 회원가입 / 로그인
5. 유저 페이지에서 내 테스트 목록 확인
6. 회원 비밀번호 / 별명 변경

### 기술 스택
1. Node.js
2. Express
3. MongoDB / Mongoose
4. EJS
4. HTML / CSS / Bootstrap / Vanilla JavaScript
5. Axios
6. Deploy: Heroku

<br>
<br>
<br>


# ScreenShots
## Index
1. [홈페이지](#홈페이지)
2. [테스트 생성](#테스트-생성)
3. [테스트 실행 / 결과](#테스트-실행)
4. [회원가입](#회원가입)
5. [로그인](#로그인)
6. [유저 개인 페이지](#유저-개인-페이지)
7. [유저 테스트 페이지](#유저-테스트-페이지)
8. [개별 테스트 페이지](#개별-테스트-페이지)
9. [테스트 수정 페이지](#테스트-수정-페이지)
10. [유저 비밀번호 / 별명 바꾸기](#비밀번호-변경)
11. [오류 페이지](#오류-페이지)

<br>
<br>

## 홈페이지
#### 로그인 이전: 
![홈페이지-로그아웃](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473265/makeMBTItest/home-beforelogin_v6kdbs.png)
#### 로그인 이후: 
![홈페이지-로그인](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473265/makeMBTItest/home-afterlogin_ugzid1.png)
- 로그인 전후로 화면이 바뀝니다. 
- 로그인하면 Flash를 사용하여 유저에게 안내해줍니다.
- 로그인 이전의 화면에서 <회원 테스트 만들기> 버튼을 클릭하면 로그인 화면으로 이동합니다.
- 로그인 이전 <비회원 테스트 만들기>, 로그인 이후 <회원 테스트 만들기> 버튼을 클릭하면 테스트 생성 화면으로 이동합니다.

<br>
<br>
<br>

## 테스트 생성
#### 테스트 생성1: 이름, 설명
![테스트 생성1](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/maketest1_r9anpj.png)
#### 테스트 생성2: 채점기준
![테스트 생성2](https://res.cloudinary.com/dwu65dhp2/image/upload/v1629197214/makeMBTItest/maketest2_new_kvlzka.png)
#### 테스트 생성3: 질문
![테스트 생성3](https://res.cloudinary.com/dwu65dhp2/image/upload/v1629197214/makeMBTItest/maketest3_new_f8qcrr.png)
#### 테스트 생성4: 결과
![테스트 생성4](https://res.cloudinary.com/dwu65dhp2/image/upload/v1629197214/makeMBTItest/maketest4_new_ina3je.png)
#### 테스트 생성5: 완성
![테스트 생성5](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473266/makeMBTItest/maketest5_enrvzb.png)
* Mongoose Model을 이용하여 테스트를 생성합니다. 테스트를 만들기 위해서 입력할 값이 많기 때문에 CSS와 JavaScript를 이용하여 유저에게 보여지는 부분을 네 부분으로 나누었습니다.
* 채점기준, 질문, 결과는 <추가> 버튼을 누르면 파란 박스 아래에 카드 형태로 추가되어 유저가 확인할 수 있습니다. 
* 추가된 카드는 X버튼으로 다시 삭제할 수 있습니다.
* Axios를 이용하여 서버에 Request를 보냅니다.
* 테스트 실행 시 오류를 없애기 위해 질문의 수는 채점기준의 수보다 많거나 같고, 결과의 수는 (2 ^ 채점기준의 수)와 같도록 설정되어 있습니다.

<br>
<br>
<br>

## 테스트 실행

#### 테스트 실행1: 
![테스트 실행1](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/conduct1_tociax.png)
* 테스트를 시작하기 위한 화면입니다.

#### 테스트 실행2: 
![테스트 실행2](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/conduct2_ck6agq.png)
* 테스트를 실행하는 화면입니다. 질문에 따라 두 가지 답안 중 하나를 고를 수 있습니다.

#### 테스트 결과: 
![테스트 결과](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/testresult_zhtgln.png)
* 테스트 결과를 보여줍니다.

<br>
<br>
<br>

## 회원가입
![회원가입](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/register_huqda9.png)
* Passport.js를 이용하여 회원가입 기능을 구축하였습니다.

<br>
<br>
<br>

## 로그인
![로그인](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473266/makeMBTItest/login_hkj1lu.png)
* Passport.js를 이용하여 로그인 기능을 구축하였습니다.

<br>
<br>
<br>

## 유저 개인 페이지
![유저 개인 페이지](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473266/makeMBTItest/personal_mfu3ua.png)
* 네비게이션 바의 별명을 클릭하면 유저 개인 페이지로 이동합니다.
* 로그인하지 않은 상태에서 접근하면 로그인 페이지로 이동합니다.

<br>
<br>
<br>

## 유저 테스트 페이지
![유저 테스트 페이지](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473265/makeMBTItest/personal-usertests_hgszin.png)
* 유저가 만든 테스트를 볼 수 있습니다.
* 로그인하지 않은 상태에서 접근하면 로그인 페이지로 이동합니다.

<br>
<br>
<br>

## 개별 테스트 페이지
![개별 테스트 페이지](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473268/makeMBTItest/personal-usertests-show_gcunhq.png)
* 테스트의 내용을 확인할 수 있습니다.
* <수정> 버튼으로 테스트 수정 페이지로 이동할 수 있습니다.
* <테스트 삭제하기> 버튼으로 테스트를 삭제할 수 있습니다.
* 로그인하지 않은 상태에서 접근하면 로그인 페이지로 이동합니다.
* 유저의 테스트가 아닌 경우 접근권한 오류 페이지로 이동합니다.

<br>
<br>
<br>

## 테스트 수정 페이지
#### 테스트 이름 / 설명 수정
![테스트 수정 페이지1](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627550014/makeMBTItest/edittest1_uqcxqs.png)
#### 채점기준 수정
![테스트 수정 페이지2](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627550015/makeMBTItest/edittest2_mjfaqt.png)
#### 질문 수정
![테스트 수정 페이지3](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627550015/makeMBTItest/edittest3_n74q8y.png)
#### 결과 수정
![테스트 수정 페이지4](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627550015/makeMBTItest/edittest4_bg0wun.png)
* 테스트 내용을 수정할 수 있습니다. 사용자의 편의를 위해 이름/설명, 채점기준, 질문, 결과로 페이지를 나눴습니다.
* 로그인하지 않은 상태에서 접근하면 로그인 페이지로 이동합니다.
* 유저의 테스트가 아닌 경우 접근권한 오류 페이지로 이동합니다.

<br>
<br>
<br>

## 유저 비밀번호 / 별명 바꾸기
#### 비밀번호 변경
![유저 비밀번호 바꾸기](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473263/makeMBTItest/personal-changepassword_ididdj.png)
#### 별명 변경
![유저 별명 바꾸기](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/personal-changenickname_d3vhkz.png)

<br>
<br>
<br>

## 오류 페이지
#### 접근권한 오류 페이지
![접근권한 오류 페이지](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627565520/makeMBTItest/notAuthorized_wffopn.png)
* 접근 권한이 없는 페이지에 접근할 경우 사용됩니다.
    1. 로그인이 필요한 페이지
    2. 다른 유저의 페이지에 접근하는 경우
* 이미 로그인된 상태라면 '로그인 후 이용해주시기 바랍니다'라는 문구와 <회원가입>, <로그인> 버튼이 보이지 않습니다.
#### 주소 오류 페이지
![주소 오류 페이지](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627565703/makeMBTItest/noPage_irfeay.png)
* 주소에 오류가 있을 때 사용됩니다.
    1. 아예 존재하지 않는 주소
    2. 주소 내부의 아이디 오류

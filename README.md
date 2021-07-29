# MakeMBTItest MBTI 테스트 만들기
**MBTI 테스트를 만들고 실행까지 할 수 있는 웹사이트 입니다.**
[(링크)](https://calm-tundra-05138.herokuapp.com/personal)

MBTI 테스트가 유행하면서 기존의 MBTI 테스트에 여러 가지 테마를 덧붙여 새로운 테스트를 만들기도 합니다(예시: [롤 MBTI](https://next.op.gg/mbti), [디즈니 MBTI](https://poomang.com/disneyprincess2021?c=9&kc=7878)). 이 웹사이트는 자신의 웹사이트를 구축하지 않더라도 MBTI 테스트를 만들고 공유할 수 있게 해줍니다.

<!-- 
<div>
    <img src="https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473265/makeMBTItest/home-beforelogin_v6kdbs.png">
</div> -->
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
3. MongoDB
4. EJS
4. HTML / CSS / Vanilla JavaScript
5. Axios
6. Deploy: Heroku

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
10. [유저 비밀번호 / 별명 바꾸기](#유저-비밀번호/별명-바꾸기)

<br>
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
![테스트 생성2](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473267/makeMBTItest/maketest2_md2to0.png)
#### 테스트 생성3: 질문
![테스트 생성3](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473267/makeMBTItest/maketest3_azbpzl.png)
#### 테스트 생성4: 결과
![테스트 생성4](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473267/makeMBTItest/maketest4_j1qsjd.png)
#### 테스트 생성5: 완성
![테스트 생성5](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473266/makeMBTItest/maketest5_enrvzb.png)
* 테스트를 생성합니다. 테스트를 만들기 위해서 입력할 값이 많기 때문에 CSS와 JavaScript를 이용하여 유저에게 보여지는 부분을 네 부분으로 나누었습니다.
* 채점기준, 질문, 결과는 <추가> 버튼을 누르면 파란 박스 아래에 카드 형태로 추가되어 유저가 확인할 수 있습니다. 

<br>
<br>
<br>

## 테스트 실행

#### 테스트 실행1: 
![테스트 실행1](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/conduct1_tociax.png)

#### 테스트 실행2: 
![테스트 실행2](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/conduct2_ck6agq.png)

#### 테스트 결과: 
![테스트 결과](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/testresult_zhtgln.png)


<br>
<br>
<br>

## 회원가입
![회원가입](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/register_huqda9.png)


<br>
<br>
<br>

## 로그인
![로그인](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473266/makeMBTItest/login_hkj1lu.png)


<br>
<br>
<br>

## 유저 개인 페이지
![유저 개인 페이지](https://res.cloudinary.com/dwu65dhp2/image/upload/v1627473264/makeMBTItest/register_huqda9.png)
### 유저 개인 페이지

<br>
<br>
<br>

## 유저 테스트 페이지

<br>
<br>
<br>

## 개별 테스트 페이지

<br>
<br>
<br>

## 테스트 수정 페이지

<br>
<br>
<br>

## 유저 비밀번호 / 별명 바꾸기